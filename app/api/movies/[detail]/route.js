import { NextResponse } from "next/server";
import movies from "@/data/moviesData";

const movieComments = {};


export async function GET(request, { params }) {
	const { detail } = await params;

	// 원본 데이터에서 ID가 일치하는 영화 검색
	const movie = movies.find((m) => m.id === detail);

	// 영화가 없을 경우 404 에러 반환
	if (!movie) {
		return new Response(JSON.stringify({ error: "영화 정보를 찾을 수 없습니다." }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	// 저장소에서 해당 영화의 댓글 배열을 가져옴 (없으면 빈 배열)
	const comments = movieComments[detail] || [];

	// 영화 데이터와 댓글 목록을 합쳐서 반환
	return NextResponse.json({ ...movie, comments });
}