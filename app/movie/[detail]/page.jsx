"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import movies from "@/data/moviesData";

export default function MovieDetail() {
	const params = useParams();
	const { detail } = params; // URL에서 '[detail]' "파라미터" 가져오기 (폴더명과 일치해야 함)

	// [detail] URL 파라메터 값을 사용하여 해당 영화를 더미 데이터에서 찾기
	const movie = movies.find((m) => m.id === detail);

	// 레이어 팝업의 상태 관리
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	if (!movie) {
		return <div>해당 영화는 없습니다.</div>
	}

	//팝업열기 핸들러
	const handleOpenPopup = () => {
		setIsPopupOpen(true);
	};

	//팝업닫기 핸들러
	const handleClosePopup = () => {
		setIsPopupOpen(false);
	}

	//유튜브 비디오 ID를 더미데이터에서 받아서 URL로 변환
	const getEmbedUrl = (originalUrl) => {
		//더미데이터에서 'v=' 뒤의 ID를 추출
		const videoId = originalUrl.split('v=')[1];
		if (videoId) {
			return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
		}
		return "";
	}

	const embedUrl = movie.youtubeId ? getEmbedUrl(movie.youtubeId) : "";

	return (
		<div className="desc">
			{/* 무비 디테일 */}
			<div className="wrap-movie-detail">
				{/* 영화 표지 */}
				<div className="thumb">
					<Image src={movie.imageDetailUrl} alt={movie.title} width={860} height={964} />
					<div className="play">
						<button type="button" onClick={handleOpenPopup}>
							<Image src="/images/ic-movie-play2.png" alt="플레이 이미지" width={80} height={80} />
						</button>
					</div>
				</div>

				<div className="badge">
					<ul>
						<li>+18</li>
						<li>action</li>
						<li className="star"><Image src="/images/ic-movie-star.png" alt="커버 이미지" width={48} height={48} /> {movie.rating}</li>
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
					<div className="title">
						Actors
					</div>
					<div className="list">
						<ul>
							{movie.actors && movie.actors.map((actor, index) => (
								<li key={index}>
									<div className="thumb">
										<Image src={actor.imageUrl} alt={actor.name} width={216} height={216} />
									</div>
									<div className="name">
										{actor.name}
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="button">
					<button type="button" onClick={handleOpenPopup}>Play</button>
				</div>
			</div>

			{/* 유투브 팝업 */}
			{isPopupOpen && (
				<div className="wrap-youtube">
					<div className="box-youtube">
						<button className="close" onClick={handleClosePopup}>닫기</button>
						<iframe
							width="800"
							height="450"
							src={embedUrl}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				</div>
			)}
		</div>
	);
}
