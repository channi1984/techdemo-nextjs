"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function MovieDetail() {
	const params = useParams();
	const { detail } = params; // URL에서 '[detail]' "파라미터" 가져오기 (폴더명과 일치)

	const [movie, setMovie] = useState(null); //특정 영화 데이트를 위한 상태
	const [allMovies, setAllMovies] = useState([]); //전체 영화 데이터를 위한 상태
	const [loading, setLoading] = useState(true); //로딩 상태
	const [error, setError] = useState(null); //에러 상태

	// 모든 영화 데이터를 fetch하는 useEffect
	useEffect(() => {
		async function fetchAllMovies() {
			try {
				setLoading(true);
				const response = await fetch('/api/movies');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setAllMovies(data);
			} catch (e) {
				setError("영화 데이터를 불러오는 데 실패했습니다.");
				console.error('Fetch error:', e);
				setAllMovies([]); //에러 발생하면 빈 배열 설정
			} finally {
				setLoading(false);
			}
		}

		fetchAllMovies();
	}, []);

	useEffect(() => {
		if (allMovies.length > 0 && detail) {
			const foundMovie = allMovies.find((m) => m.id === detail);
			setMovie(foundMovie);
		} else if (allMovies.length === 0 && !loading && !error) {
			setMovie(null);
		}
	}, [allMovies, detail, loading, error]);

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
