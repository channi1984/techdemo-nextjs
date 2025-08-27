import { NextResponse } from "next/server";
import movies from "@/data/moviesData";

export async function GET() {
	return NextResponse.json(movies);
}