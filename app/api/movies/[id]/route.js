import { NextResponse } from "next/server";
import movies from "@/data/moviesData";

export async function GET(request, { params }) {
    const { id } = params;

    const movie = movies.find((m) => m.id === id);

    if (!movie) {
        return new Response(JSON.stringify({ error: "영화 정보를 찾을 수 없습니다." }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return NextResponse.json(movie);
}