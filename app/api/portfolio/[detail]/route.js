import { NextResponse } from "next/server";
import portfolioData from "@/data/portfolioData";

export async function GET(request, { params }) {
	const { detail } = await params;

	// 원본 데이터에서 ID가 일치하는 영화 검색
	const portfolio = portfolioData.find((m) => m.id === detail);

	// 영화가 없을 경우 404 에러 반환
	if (!portfolio) {
		return new Response(JSON.stringify({ error: "포트폴리오를 찾을 수 없습니다." }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	// 영화 데이터와 댓글 목록을 합쳐서 반환
	return NextResponse.json(portfolio);
}