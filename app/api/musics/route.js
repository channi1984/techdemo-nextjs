import { NextResponse } from "next/server";
import musics from "@/data/musicsDada";

export async function GET() {
    return NextResponse.json(musics);
}