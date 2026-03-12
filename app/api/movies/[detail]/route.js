import { NextResponse } from "next/server";
import movies from "@/data/moviesData";

/**
 * [임시 저장소]
 * 데이터베이스 대신 메모리에 댓글을 저장합니다.
 * 주의: 서버가 재시작되거나 소스 코드가 수정되면 데이터가 초기화됩니다.
 * 구조 예시: { "movie-1": [{ id: 123, content: "꿀잼" }], "movie-2": [...] }
 */

const movieComments = {};

/**
 * 1. GET: 특정 영화 상세 정보 및 해당 영화의 댓글 목록 조회
 */

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

/**
 * 2. POST: 새로운 댓글 등록
 */

export async function POST(request, { params }) {
	const { detail } = await params;
	const { content } = await request.json(); // 클라이언트가 보낸 JSON 바디에서 내용 추출

	// 댓글 내용이 비어있는지 유효성 검사
	if (!content) {
		return new Response(JSON.stringify({ error: "댓글 내용을 입력해 주세요." }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	// 새 댓글 객체 생성 (고유 ID를 위해 현재 시간 타임스탬프 활용)
	const newComment = {
		id: Date.now(),
		content: content
	};

	// 해당 영화에 대한 댓글 배열이 아직 없다면 생성
	if (!movieComments[detail]) {
		movieComments[detail] = [];
	}

	// 메모리 저장소에 댓글 추가
	movieComments[detail].push(newComment);

	// 생성된 댓글 객체를 결과로 반환 (클라이언트 UI 업데이트용)
	return NextResponse.json(newComment);
}

/**
 * 3. DELETE: 특정 댓글 삭제
 */
export async function DELETE(request, { params }) {
	const { detail } = await params; //영화 ID
	const { commentId } = await request.json(); // 삭제할 댓글의 고유 ID 추출

	// 해당 영화에 등록된 댓글 자체가 없는 경우 처리
	if (!movieComments[detail]) {
		return new Response(JSON.stringify({ error: "영화에 대한 댓글을 찾을 수 없습니다." }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	// 삭제 전 배열의 길이를 기록 (삭제 성공 여부 판단용)
	const initialLength = movieComments[detail].length;

	// 전달받은 commentId와 일치하지 않는 댓글들만 남겨서 배열 업데이트
	movieComments[detail] = movieComments[detail].filter(c => c.id !== commentId);

	// 필터링 후에도 배열 길이가 같다면, 일치하는 ID가 없었다는 의미
	if (movieComments[detail].length === initialLength) {
		return new Response(JSON.stringify({ error: "삭제할 댓글이 존재하지 않습니다." }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	// 삭제 완료 메시지 반환
	return NextResponse.json({ message: "댓글이 성공적으로 삭제되었습니다." });
}