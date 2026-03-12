"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function MovieDetail() {
	const params = useParams();
	// 동적 라우팅 경로인 [detail]에서 영화 ID를 추출
	const { detail } = params;

	// 영화 상세 정보 데이터
	const [movie, setMovie] = useState(null);
	// 초기 로딩 상태
	const [loading, setLoading] = useState(true);
	// 에러 메세지
	const [error, setError] = useState(null);
	// 유튜브 팝업 노출 여부
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	// 좋아요 여부
	const [isLiked, setIsLiked] = useState(false);

	// 작성 중인 댓글 텍스트
	const [comment, setComment] = useState("");
	// 댓글 리스트
	const [comments, setComments] = useState([]);
	// 댓글 등록 중 상태
	const [commentLoading, setCommentLoading] = useState(false);
	// 각 댓글별 삭제 로딩 상태
	const [deleteLoading, setDeleteLoading] = useState({});

	// API 데이터 통신 함수
	async function fetchMovie() {
		try {
			setLoading(true);
			const response = await fetch(`/api/movies/${detail}`);
			const data = await response.json();

			const { comments, ...movieData } = data;

			setMovie(movieData);

			const savedComments = JSON.parse(localStorage.getItem(`comments_${detail}`) || "[]");
			setComments(savedComments);

		} catch (e) {
			setError("영화 데이터를 불러오는 데 실패했습니다.");
		} finally {
			setLoading(false);
		}
	}

	// [useEffect] 영화 ID(detail)가 바뀔 때마다 영화 상세 정보를 새로 가져옴
	useEffect(() => {
		if (!detail) {
			setLoading(false);
			return;
		}

		fetchMovie();
	}, [detail]);

	// [useEffect] 초기 로드 시 로컬 스토리에서 여부 확인
	useEffect(() => {
		if (!detail) return;

		//좋아요 여부 확인
		const savedLikes = JSON.parse(localStorage.getItem("movieLikes") || "[]")
		setIsLiked(savedLikes.includes(detail));

		//댓글 데이터 로드
		const savedComments = JSON.parse(localStorage.getItem(`comments_${detail}`) || "[]");
		setComments(savedComments);
	}, [detail]);

	// 좋아요 토글 로직 : 로컬 스토리지에 영화 ID 저장/삭제
	const handleToggleLike = () => {
		const savedLikes = JSON.parse(localStorage.getItem("movieLikes") || "[]");
		let updatedLikes;

		if (isLiked) {
			// 이미 좋아요 상태면 배열에서 해당 ID 제거
			updatedLikes = savedLikes.filter(id => id !== detail);
		} else {
			// 좋아요 상태가 아니면 기존 배열에서 ID 추가
			updatedLikes = [...savedLikes, detail];
		}

		localStorage.setItem("movieLikes", JSON.stringify(updatedLikes));
		setIsLiked(!isLiked);
	};

	// 댓글 등록 (로컬 스토리지에 저장)
	const handlePostComment = () => {
		if (comment.trim() === "") {
			alert("댓글을 입력해 주세요.");
			return;
		}

		const newComment = {
			id: Date.now(), // 고유 ID로 타임스탬프 사용
			content: comment,
			date: new Date().toLocaleString() // 작성 시간 추가
		};

		const updatedComments = [...comments, newComment];

		// 로컬스토리지에 저장
		localStorage.setItem(`comments_${detail}`, JSON.stringify(updatedComments));

		// UI 상태 업데이트
		setComments(updatedComments);
		setComment("");
	};

	// 댓글 등록 (로컬 스토리지에서 삭제)
	const handleDeleteComment = (commentId) => {
		if (!confirm("댓글을 삭제하시겠습니까?")) return;

		const updatedComments = comments.filter(c => c.id !== commentId);

		// 로컬스토리지 업데이트
		localStorage.setItem(`comments_${detail}`, JSON.stringify(updatedComments));

		// UI 상태 업데이트
		setComments(updatedComments);
	};

	// 유튜브 팝업 제어
	const handleOpenPopup = () => {
		if (movie && movie.youtubeId) {
			setIsPopupOpen(true);
		} else {
			alert("죄송합니다. 예고편 영상이 준비되지 않았습니다.");
		}
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	// 유튜브 ID(URL 형태 등)에서 Video Id만 추출하여 임베드 URL 생성
	const getEmbedUrl = (youtubeId) => {
		// "v="를 제거하고 순수한 ID만 추출
		const videoId = youtubeId.split('v=')[1];
		if (videoId) {
			return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
		}
		return null;
	};

	const embedUrl = movie && movie.youtubeId ? getEmbedUrl(movie.youtubeId) : null;


	// 예외 상황 처리 렌더링
	if (loading) {
		return <div className="desc loading">영화 데이터를 불러오는 중입니다...</div>;
	}

	if (error) {
		return <div className="desc error">에러: {error}</div>;
	}

	if (!movie) {
		return <div className="desc loading">해당 영화는 없습니다.</div>;
	}

	// 메인 UI 렌더링
	return (
		<div className="desc">
			{/* --- 상단: 영화 상세 영역 --- */}
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

				{/* 뱃지 및 평점, 좋아요 버튼 */}
				<div className="badge">
					<ul>
						<li>+18</li>
						<li>{movie.genre}</li>
						<li className="star">
							<Image src="/images/ic-movie-star.png" alt="커버 이미지" width={48} height={48} />
							{movie.rating}
						</li>
					</ul>
					<button
						type="button"
						className={`link ${isLiked ? "on" : ""}`}
						onClick={handleToggleLike}
					>
						{/* 찜 여부에 따라 흑백/컬러 필터 적용 */}
						<Image src="/images/ic-movie-like.png" alt="하트 이미지" width={32} height={29} style={{ filter: isLiked ? 'none' : 'grayscale(1)' }} />
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

				{/* 출연 배우 리스트 */}
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

			{/* --- 하단: 댓글 영역 --- */}
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

				{/* 등록된 댓글 리스트 */}
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

			{/* --- 모달: 유튜브 팝업 영역 --- */}
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