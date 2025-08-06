"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from 'react';

export default function MovieFeatures() {
	// 검색어 상태
	const [searchTerm, setSearchTerm] = useState("");
	// API에서 영화 목록 가져옴
	const [movies, setMovies] = useState([]);
	// 로딩상태
	const [loading, setLoading] = useState(true);
	// 에러상태
	const [error, setError] = useState(null);
	// 영화 검색어 입력 상태
	const [filteredMovies, setFilteredMovies] = useState([]);
	// 현재 활성화된 탭 상태, 기본값은 All
	const [activeTab, setActiveTab] = useState("All");

	// Fetch
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
				setFilteredMovies(data);
			} catch (e) {
				throw new Error("영화 데이터를 불러오는 데 실패했습니다.");
				console.error("Fetch error:", e);
			} finally {
				setLoading(false);
			}
		}
		fetchMovies();
	}, []);

	// 검색어 또는 탭 변경시 필터
	useEffect(() => {
		let currentFilteredMovies = movies;

		// 1차 필터링 : 장르 필터링
		if (activeTab !== 'All') {
			currentFilteredMovies = currentFilteredMovies.filter(
				(movie) => movie.genre === activeTab
			);
		}

		// 2차 필터링 : 검색어 필터링
		if (searchTerm !== "") {
			const lowercasedSearchTerm = searchTerm.toLowerCase();
			currentFilteredMovies = currentFilteredMovies.filter((movie) => (
				movie.title.toLowerCase().includes(lowercasedSearchTerm)
			));
		}
		setFilteredMovies(currentFilteredMovies);
	}, [searchTerm, activeTab, movies]); //searchTerm 또는 activeTab이 변경될 때마다 이 효과를 실행

	// 검색어 입력 핸들러
	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value); //입력 필드의 값으로 검색어 상태를 업데이트
	};

	// 장르 클릭 핸들러
	const handleTabClick = (genre) => {
		setActiveTab(genre); //클릭한 탭 탭 상태 업데이트
		setSearchTerm(""); //검색어 초기화
	}

	//로딩중
	if (loading) return <div className="desc loading">영화 데이터를 불러오는 중입니다.</div>;
	//에러남
	if (error) return <div className="desc error">에러: {error}</div>;

	return (
		<div className="desc">
			{/* 무비 */}
			<div className="wrap-movie">
				{/* 헤더 */}
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

				{/* 검색 */}
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

				{/* 장르 */}
				<div className="tab">
					<ul>
						<li className={activeTab === "All" ? "on" : ""}><button type="button" onClick={() => handleTabClick("All")}>All</button></li>
						<li className={activeTab === "Action" ? "on" : ""}><button type="button" onClick={() => handleTabClick("Action")}>Action</button></li>
						<li className={activeTab === "Drama" ? "on" : ""}><button type="button" onClick={() => handleTabClick("Drama")}>Drama</button></li>
						<li className={activeTab === "Comedy" ? "on" : ""}><button type="button" onClick={() => handleTabClick("Comedy")}>Comedy</button></li>
						<li className={activeTab === "Romance" ? "on" : ""}><button type="button" onClick={() => handleTabClick("Romance")}>Romance</button></li>
					</ul>
				</div>

				{/* 무비 리스트 */}
				<div className="list">
					<ul>
						{/* filteredMovies를 사용하여 렌더링합니다. */}
						{filteredMovies.map((movie) => (
							<li key={movie.id}>
								<Link href={`/movie_api/${movie.id}`}>
									<div className="thumb">
										<Image src={movie.imageUrl} alt={movie.title} width={384} height={538} />
									</div>
									<div className="subject">
										{movie.title}
									</div>
									<ul className="star">
										{Array.from({ length: Math.round(movie.rating) }).map((_, index) => (
											<li key={`star-${index}`}>
												<Image src="/images/ic-movie-star.png" alt="별점이미지" width={48} height={48} />
											</li>
										))}
									</ul>
								</Link>
							</li>
						))}
						{/* 검색 결과가 없을 때 메세지 표시 */}
						{filteredMovies.length === 0 && searchTerm !== "" && (
							<li className="nodata">No Data.</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}