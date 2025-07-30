"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import movies from "@/data/moviesData";

export default function MovieDetail() {
	const params = useParams();
	const { detail } = params; // URL에서 '[detail]' 파라미터 가져오기 (폴더명과 일치)

	// [detail] 값을 사용하여 해당 영화를 더미 데이터에서 찾기
	const movie = movies.find((m) => m.id === detail);

	if (!movie) {
		return <div>해당 영화는 없습니다.</div>
	}
	return (
		<div className="desc">
			{/* 무비 디테일 */}
			<div className="wrap-movie-detail">
				{/* 영화 표지 */}
				<div className="thumb">
					<Image src={movie.imageDetailUrl} alt={movie.title} width={860} height={964} />
					<div className="play">
						<button type="button">
							<Image src="/images/ic-movie-play2.png" alt="플레이 이미지" width={80} height={80} />
						</button>
					</div>
				</div>

				<div className="badge">
					<ul>
						<li>+18</li>
						<li>action</li>
						<li className="star"><Image src="/images/ic-movie-star.png" alt="커버 이미지" width={48} height={48} /> 5.0</li>
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
						<strong>Show More</strong>
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
					<button type="button">Play</button>
				</div>
			</div>
		</div>
	);
}
