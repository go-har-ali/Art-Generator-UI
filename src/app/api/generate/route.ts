import { NextResponse } from "next/server";
import { getModels } from "@/lib/data";

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt, model } = body ?? {};

  if (!prompt || !model) {
    return NextResponse.json(
      { error: "Prompt and model are required." },
      { status: 400 }
    );
  }

  const models = await getModels();
  const selectedModel = models.find((item) => item.id === model);

  if (!selectedModel) {
    return NextResponse.json({ error: "Model not found." }, { status: 404 });
  }

  const imageUrl = `${selectedModel.thumbnail}&prompt=${encodeURIComponent(
    prompt
  )}`;

  return NextResponse.json({
    prompt,
    model,
    imageUrl,
    createdAt: new Date().toISOString(),
  });
}

