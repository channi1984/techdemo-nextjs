"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function MovieDetail() {
	const params = useParams();
	const { detail } = params; // 동적 라우터 이름과 같아야함. 지금은 [detail]의 detail임

	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	const [commentLoading, setCommentLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState({});

	async function fetchMovie() {
		try {
			setLoading(true);
			const response = await fetch(`/api/movies/${detail}`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			const { comments, ...movieData } = data;
			setMovie(movieData);
			setComments(comments);
		} catch (e) {
			setError("영화 데이터를 불러오는 데 실패했습니다.");
			console.error('Fetch error:', e);
		} finally {
			setLoading(false);
		}
	}

	// 단일 영화 데이터를 fetch하는 useEffect
	useEffect(() => {
		if (!detail) {
			setLoading(false);
			return;
		}

		// useEffect가 실행될 때마다 fetchMovie 함수를 호출합니다.
		fetchMovie();
	}, [detail]);

	// 팝업 열기 핸들러
	const handleOpenPopup = () => {
		if (movie && movie.youtubeId) {
			setIsPopupOpen(true);
		} else {
			alert("죄송합니다. 예고편 영상이 준비되지 않았습니다.");
		}
	};

	// 팝업 닫기 핸들러
	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	// 유튜브 비디오 ID를 URL로 변환하는 함수
	const getEmbedUrl = (youtubeId) => {
		// "v="를 제거하고 순수한 ID만 추출
		const videoId = youtubeId.split('v=')[1];
		if (videoId) {
			// 올바른 유튜브 embed URL 형식
			return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
		}
		return null;
	};

	const embedUrl = movie && movie.youtubeId ? getEmbedUrl(movie.youtubeId) : null;

	// 댓글 작성 핸들러
	const handlePostComment = async () => {
		if (comment.trim() === "") {
			alert("댓글을 입력해 주세요.");
			return;
		}

		try {
			setCommentLoading(true);
			const response = await fetch(`/api/movies/${detail}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content: comment }), // 댓글 내용을 JSON 형태로 전송
			});

			if (!response.ok) {
				throw new Error("댓글 작성에 실패했습니다.");
			}

			const data = await response.json();
			console.log("댓글 저장 성공", data.message);

			// POST 요청 성공 후, 전체 댓글 목록을 다시 불러와 상태를 업데이트합니다.
			await fetchMovie(); // fetchMovie 함수를 호출하여 최신 댓글 데이터를 다시 가져옴
			setComment(""); //입력 필드 초기화
		} catch (e) {
			console.error("댓글 작성 오류:", e);
			alert("댓글 작성 중 오류가 발생했습니다.");
		} finally {
			setCommentLoading(false);
		}
	}

	// 댓글 삭제 핸들러
	const handleDeleteComment = async (commentId) => {
		// 삭제 중 로딩 상태를 설정합니다.
		setDeleteLoading(prev => ({ ...prev, [commentId]: true }));

		try {
			const response = await fetch(`/api/movies/${detail}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ commentId }), // 삭제할 댓글의 ID를 본문에 담아 보냅니다.
			});

			if (!response.ok) {
				// 서버에서 에러가 발생하면, 에러 메시지를 포함하여 오류를 던집니다.
				const errorData = await response.json();
				throw new Error(errorData.error || "댓글 삭제에 실패했습니다.");
			}

			// DELETE 요청 성공 후, 전체 댓글 목록을 다시 불러와 상태를 업데이트합니다.
			await fetchMovie(); // fetchMovie 함수를 호출하여 최신 댓글 데이터를 다시 가져옴
			console.log("댓글 삭제 성공");

		} catch (e) {
			console.error("댓글 삭제 오류:", e);
			// 서버에서 보낸 에러 메시지를 사용자에게 보여줍니다.
			alert(`댓글 삭제 중 오류가 발생했습니다: ${e.message}`);
		} finally {
			setDeleteLoading(prev => ({ ...prev, [commentId]: false }));
		}
	};

	if (loading) {
		return <div className="desc loading">영화 데이터를 불러오는 중입니다...</div>;
	}

	if (error) {
		return <div className="desc error">에러: {error}</div>;
	}

	if (!movie) {
		return <div className="desc loading">해당 영화는 없습니다.</div>;
	}

	return (
		<div className="desc">
			{/* 무비 디테일 */}
			<div className="wrap-movie-detail">
				<div className="thumb">
					<Image src={movie.imageDetailUrl} alt={movie.title} width={860} height={964} />
					<div className="play">
						{/* 유튜브 ID가 있을 때만 버튼 렌더링 */}
						{movie.youtubeId && (
							<button type="button" onClick={handleOpenPopup}>
								<Image src="/images/ic-movie-play2.png" alt="플레이 이미지" width={80} height={80} />
							</button>
						)}
					</div>
				</div>

				<div className="badge">
					<ul>
						<li>+18</li>
						{/* genre를 동적으로 표시하도록 수정 */}
						<li>{movie.genre}</li>
						<li className="star">
							<Image src="/images/ic-movie-star.png" alt="커버 이미지" width={48} height={48} />
							{movie.rating}
						</li>
					</ul>
					<button type="button" className="like">
						<Image src="/images/ic-movie-like.png" alt="하트 이미지" width={50} height={45} />
					</button>
				</div>

				<div className="info">
					<div className="title">
						{movie.title}
					</div>
					<div className="text">
						{movie.description}
					</div>
				</div>

				<div className="actor">
					<div className="title">Actors</div>
					<div className="list">
						<ul>
							{movie.actors && movie.actors.map((actor) => (
								<li key={actor.name}>
									<div className="thumb">
										<Image src={actor.imageUrl} alt={actor.name} width={216} height={216} />
									</div>
									<div className="name">{actor.name}</div>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="button">
					{/* 유튜브 ID가 있을 때만 버튼 렌더링 */}
					{movie.youtubeId && (
						<button type="button" onClick={handleOpenPopup}>Play</button>
					)}
				</div>
			</div>

			{/* 무비 댓글 */}
			<div className="wrap-movie-comment">
				<div className="header">
					<div className="search">
						<div className="input">
							<input
								type="text"
								placeholder="감상평을 써주세요."
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										handlePostComment();
									}
								}}
							/>
						</div>
						<div className="button">
							<button
								type="button"
								onClick={handlePostComment}
								disabled={commentLoading}
							>
								{commentLoading ? "작성중..." : '작성'}
							</button>
						</div>
					</div>
				</div>

				<div className="list">
					<div className="work">
						<ul>
							{comments.map((c) => (
								// key prop 추가
								<li key={c.id}>
									<div className="left">
										<strong className="subject">{c.content}</strong>
									</div>
									<div className="right">
										<div className="del">
											<button
												type="button"
												className="btn-del"
												onClick={() => handleDeleteComment(c.id)}
												disabled={deleteLoading[c.id]}
											>
												{deleteLoading[c.id] ? '삭제 중...' : '삭제하기'}
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* 유튜브 팝업 */}
			{isPopupOpen && embedUrl && (
				<div className="wrap-youtube">
					<div className="box-youtube">
						<button className="close" onClick={handleClosePopup}>닫기</button>
						<div className="videoWrapper">
							<iframe
								width="100%"
								height="auto"
								src={embedUrl}
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}