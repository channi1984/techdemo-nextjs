// Next.js 전용 응답 객체 임포트
import { NextResponse } from "next/server";
// 로컬에 저장된 영화 데이터(배열 등) 임포트
import movies from "@/data/moviesData";

/**
 * [GET] /api/movies
 * 모든 영화 목록을 가져오는 API 엔드포인트
 */

export async function GET() {
	// NextResponse.json()을 사용하면:
	// 1. 데이터를 JSON 문자열로 자동 변환함
	// 2. HTTP Header의 Content-Type을 'application/json'으로 자동 설정함
	return NextResponse.json(movies);
}