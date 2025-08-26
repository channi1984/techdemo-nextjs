"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function MovieDetail() {
	const params = useParams();
	const { detail } = params;

	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	const [commentLoading, setCommentLoading] = useState(false);

	// 단일 영화 데이터를 fetch하는 useEffect
	useEffect(() => {
		if (!detail) {
			setLoading(false);
			return;
		}

		async function fetchMovie() {
			try {
				setLoading(true);
				// 동적 API를 호출하여 특정 영화 정보만 가져옵니다.
				const response = await fetch(`/api/movies/${detail}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();

				// 영화 데이터와 댓글 데이터를 분리해서 상태에 저장합니다.
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

			//댓글 작성 성공 후 댓글 목록 업데이트
			const newComment = { id: Date.now(), content: comment };
			setComments(prevComments => [...prevComments, newComment]);
			setComment(""); //입력 필드 초기화
		} catch (e) {
			console.error("댓글 작성 오류:", e);
			alert("댓글 작성 중 오류가 발생했습니다.");
		} finally {
			setCommentLoading(false);
		}
	}

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
							{movie.actors && movie.actors.map((actor, index) => (
								<li key={index}>
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
							{comments.map((c, index) => (
								// key prop 추가
								<li key={index}>
									<div className="left">
										<strong className="subject">{c.content}</strong>
									</div>
									<div className="right">
										<div className="del">
											<button
												type="button"
												className="btn-del"
											>
												삭제하기
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