import { NextResponse } from "next/server";
import movies from "@/data/moviesData";

// 임시 댓글 저장소 (서버 재시작 시 데이터가 사라집니다.)

const movieComments = {};

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

	//영화 데이터에 해당 영화의 댓글을 포함아여 반환
	const comments = movieComments[id] || [];

	return NextResponse.json({ ...movie, comments });
}

// 댓글 저장을 위한 POST 핸들러 추가
export async function POST(request, { params }) {
	const { id } = params;
	const { content } = await request.json(); //요청 본문에서 댓글 내용 추출

	// 댓글 유효성 검사
	if (!content) {
		return new Response(JSON.stringify({ error: "댓글 내용을 입력해 주세요." }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	// 새 댓글 객체 생성
	const newComment = {
		id: Date.now(),
		content: content
	};

	// 해당 영화 ID에 댓글 배열이 없으면 새로 생성
	if (!movieComments[id]) {
		movieComments[id] = [];
	}

	// 댓글 배열에 새 댓글 추가
	movieComments[id].push(newComment);

	return NextResponse.json({ message: "댓글이 성공적으로 저장되었씁니다." });
}

// 댓글 삭제를 위한 DELETE 핸들러 추가
export async function DELETE(request, { params }) {
	const { id } = params; //영화 아이디
	const { commentId } = await request.json(); // 댓글 ID 추출

	// 해당 영화에 대한 댓글이 없는 경우
	if (!movieComments[id]) {
		return new Response(JSON.stringify({ error: "영화에 대한 댓글을 찾을 수 없습니다." }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const initialLength = movieComments[id].length;

	//댓글 ID가 일치하는 항목을 제외하고 새 배열을 만듭니다.
	movieComments[id] = movieComments[id].filter(c => c.id !== commentId);

	// 삭제 후 길이가 변하지 않았다면 메세지 뿌리기
	if (movieComments[id].length === initialLength) {
		return new Response(JSON.stringify({ error: "삭제할 댓글이 존재하지 않습니다." }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	return NextResponse.json({ message: "댓글이 성공적으로 삭제되었습니다." });
}