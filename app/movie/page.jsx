"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect, useMemo } from 'react';

export default function MovieFeatures() {
	// 검색어 입력값
	const [searchTerm, setSearchTerm] = useState("");
	// 전체 영화 데이터 (원본)
	const [movies, setMovies] = useState([]);
	// 로딩 상태
	const [loading, setLoading] = useState(true);
	// 에러 상태
	const [error, setError] = useState(null);
	// 현재 선택된 장르 탭
	const [activeTab, setActiveTab] = useState("All");
	// 로컬스토리지에서 가져온 좋아요 ID 목록
	const [likedMovies, setLikedMovies] = useState([]);
	// 사용자가 매긴 별점 목록 상태
	const [userRatings, setUserRatings] = useState({});
	// 고정된 장르 배열
	const GENRES = ['All', 'Action', 'Drama', 'Comedy', 'Romance'];

	// API 데이터 통신 함수
	useEffect(() => {
		async function fetchMovies() {
			try {
				setLoading(true);
				const response = await fetch('/api/movies');
				if (!response.ok) {
					throw new Error(`HTTP error! state: ${response.status}`);
				}

				const data = await response.json();
				setMovies(data);
			} catch (e) {
				setError(`영화 데이터를 불러오는 데 실패했습니다. 원인: ${e.message}`);
			} finally {
				setLoading(false);
			}
		}
		fetchMovies();
	}, []);

	// 로컬스토리지에서 좋아요 / 별점 목록
	useEffect(() => {
		// 좋아요 목록
		const savedLikes = JSON.parse(localStorage.getItem('movieLikes') || "[]");
		setLikedMovies(savedLikes);

		// 별점 목록
		const savedRatings = JSON.parse(localStorage.getItem('movieRatings') || "{}");
		setUserRatings(savedRatings);
	}, []);

	// 검색어 또는 탭 변경시 필터
	const filteredMovies = useMemo(() => {
		let currentFilteredMovies = movies;

		// [1차 필터링] 장르 탭이 'All'이 아니면 해당 장르만 걸러냄
		if (activeTab !== 'All') {
			currentFilteredMovies = currentFilteredMovies.filter(
				(movie) => movie.genre === activeTab
			);
		}

		// [2차 필터링] 검색어가 입력되어 있다면 제목(Title)에서 포함 여부 확인 (대소문자 구분 X)
		if (searchTerm !== "") {
			const lowercasedSearchTerm = searchTerm.toLowerCase();
			currentFilteredMovies = currentFilteredMovies.filter((movie) => (
				movie.title.toLowerCase().includes(lowercasedSearchTerm)
			));
		}

		return currentFilteredMovies;
	}, [searchTerm, activeTab, movies]);

	// 검색어 입력 핸들러
	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	// 장르 클릭 핸들러
	const handleTabClick = (genre) => {
		setActiveTab(genre);
		setSearchTerm("");
	}

	// 조건부 렌더링: 로딩 중
	if (loading) return <div className="desc loading">영화 데이터를 불러오는 중입니다.</div>;

	// 조건부 렌더링: 에러 발생
	if (error) return <div className="desc error">에러: {error}</div>;

	return (
		<div className="desc">
			<div className="wrap-movie">
				{/* --- 상단: 사용자 프로필 헤더 --- */}
				<div className="header">
					<div className="people">
						<div className="thumb">
							<Image src="/images/ic-movie-profile.png" alt="커버이미지" width={80} height={80} />
						</div>
						<div className="info">
							<span>Welcome back!</span>
							<strong>Channi84</strong>
						</div>
					</div>

					<div className="menu">
						<button type="button">
							<Image src="/images/ic-movie-menu.png" alt="커버이미지" width={40} height={28} />
						</button>
					</div>
				</div>

				{/* --- 중간: 검색 영역 --- */}
				<div className="search">
					<button type="button" className="search">검색버튼</button>
					<input
						type="text"
						placeholder="Search"
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<button type="button" className="filter">필터버튼</button>
				</div>

				{/* --- 중간: 장르 탭 메뉴 --- */}
				<div className="tab">
					<ul>
						{GENRES.map(genre => (
							<li key={genre} className={activeTab === genre ? "on" : ""}>
								<button type="button" onClick={() => handleTabClick(genre)}>{genre}</button>
							</li>
						))}
					</ul>
				</div>

				{/* --- 하단: 필터링된 영화 카드 리스트 --- */}
				<div className="list">
					<ul>
						{filteredMovies.map((movie) => {
							const displayRating = userRatings[movie.id] || Math.round(movie.rating);

							return (
								<li key={movie.id}>
									<Link href={`/movie/${movie.id}`}>
										<div className="thumb">
											<Image src={movie.imageUrl} alt={movie.title} width={384} height={538} />
											{likedMovies.includes(movie.id) && (
												<div className="badge">
													<Image src="/images/ic-movie-like.png" alt="하트 이미지" width={20} height={18} />
												</div>
											)}
										</div>
										<div className="subject">
											{movie.title}
										</div>

										<ul className="star">
											{Array.from({ length: 5 }).map((_, index) => (
												<li key={`star-${index}`}>
													<Image
														src="/images/ic-movie-star.png"
														alt="별점이미지"
														width={48}
														height={48}
														style={{
															filter: index < displayRating ? 'none' : 'grayscale(1)',
															opacity: index < displayRating ? 1 : 0.3
														}}
													/>
												</li>
											))}
										</ul>
									</Link>
								</li>
							);
						})}
						{/* 검색 결과가 0건일 때의 예외 처리 */}
						{filteredMovies.length === 0 && searchTerm !== "" && (
							<li className="nodata">No Data.</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}