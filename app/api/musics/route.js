import { NextResponse } from "next/server";
// 외부 데이터 파일(@/data/musicsDada)에서 음악 목록과 페이지 정보를 불러옵니다.
import { musics, pageInfo } from "@/data/musicsDada";

/**
 * [GET] /api/musics (또는 해당 파일의 경로)
 * 음악 데이터와 페이지 정보를 반환하는 API 핸들러입니다.
 */
export async function GET() {
	// 스프레드 연산자(...)를 사용하여 pageInfo의 속성들을 복사하고,
	// musics 배열을 추가하여 하나의 응답 객체(responseData)로 합칩니다.
	const responseData = {
		// 페이지 제목(mainTitle), 사용자 아바타(userAvatar) 등의 정보
		...pageInfo,
		// 음악 리스트 배열
		musics: musics,
	}

	// NextResponse.json()을 사용하여 클라이언트에 JSON 형식으로 데이터를 반환합니다.
	return NextResponse.json(responseData);
}