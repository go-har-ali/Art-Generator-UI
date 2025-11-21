import { NextResponse } from "next/server";
import { getModels } from "@/lib/data";

export async function GET() {
  try {
    const data = await getModels();
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to load models" },
      { status: 500 }
    );
  }
}

