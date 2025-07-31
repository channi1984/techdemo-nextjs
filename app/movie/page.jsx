"use client";

import Image from "next/image";
import Link from "next/link";
import movies from "@/data/moviesData";
import { useState, useEffect } from 'react';

export default function MovieFeatures() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredMovies, setFilteredMovies] = useState(movies);

	useEffect(() => {
		console.log(searchTerm);
		if (searchTerm === "") {
			setFilteredMovies(movies); //검색어가 없으면 모든 영화를 표시
		} else {
			const lowercasedSearchTerm = searchTerm.toLowerCase();
			const filtered = movies.filter((movie) =>
				movie.title.toLowerCase().includes(lowercasedSearchTerm)
			);
			setFilteredMovies(filtered);
		}
	}, [searchTerm]); //searchTerm이 변경될 때마다 이 효과를 실행합니다.

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value); //입력 필드의 값으로 검색어 상태를 업데이트
	}

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
							<span>Welcome back</span>
							<strong>Aymen Missaoui</strong>
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

				{/* 탭 */}
				<div className="tab">
					<ul>
						<li className="on"><button type="button">Action</button></li>
						<li><button type="button">Drama</button></li>
						<li><button type="button">Comedy</button></li>
						<li><button type="button">Romance</button></li>
					</ul>
				</div>

				{/* 무비 리스트 */}
				<div className="list">
					<ul>
						{/* filteredMovies를 사용하여 렌더링합니다. */}
						{filteredMovies.map((movie) => (
							<li key={movie.id}>
								<Link href={`/movie/${movie.id}`}>
									<div className="thumb">
										<Image src={movie.imageUrl} alt={movie.title} width={384} height={538} />
									</div>
									<div className="subject">
										{movie.title}
									</div>
									<ul className="star">
										<li><Image src="/images/ic-movie-star.png" alt="별점이미지" width={48} height={48} /></li>
										<li><Image src="/images/ic-movie-star.png" alt="별점이미지" width={48} height={48} /></li>
										<li><Image src="/images/ic-movie-star.png" alt="별점이미지" width={48} height={48} /></li>
										<li><Image src="/images/ic-movie-star.png" alt="별점이미지" width={48} height={48} /></li>
										<li><Image src="/images/ic-movie-star.png" alt="별점이미지" width={48} height={48} /></li>
									</ul>
								</Link>
							</li>
						))}
						{/* 검색 결과가 없을 때 메세지 표시 */}
						{filteredMovies.length === 0 && searchTerm !== "" && (
							<li>검색 결과가 없습니다.</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
