import { NextResponse } from "next/server";
import { getInspirations } from "@/lib/data";

export async function GET() {
  try {
    const data = await getInspirations();
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to load inspirations" },
      { status: 500 }
    );
  }
}

