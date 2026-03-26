"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect, useMemo } from 'react';

export default function PortfolioList() {
	// 검색어 입력값
	const [searchTerm, setSearchTerm] = useState("");
	// 전체 포트폴리오 데이터 (원본)
	const [portfolios, setPortfolios] = useState([]);
	// 로딩 상태
	const [loading, setLoading] = useState(true);
	// 에러 상태
	const [error, setError] = useState(null);
	// 현재 선택된 장르 탭
	const [activeTab, setActiveTab] = useState("All");
	// 포트폴리오 카테고리
	const GENRES = ['All', '기관', '대학교', '기타'];

	// API 데이터 통신 함수
	useEffect(() => {
		async function fetchPortfolios() {
			try {
				setLoading(true);
				const response = await fetch('/api/portfolio');
				if (!response.ok) {
					throw new Error(`HTTP error! state: ${response.status}`);
				}

				const data = await response.json();
				setPortfolios(data);
			} catch (e) {
				setError(`포트폴리오를 불러오는 데 실패했습니다. 원인: ${e.message}`);
			} finally {
				setLoading(false);
			}
		}
		fetchPortfolios();
	}, []);

	// 검색어 또는 탭 변경시 필터
	const filteredPortfolios = useMemo(() => {
		let currentFilteredPortfolios = portfolios;

		// [1차 필터링] 장르 탭이 'All'이 아니면 해당 장르만 걸러냄
		if (activeTab !== 'All') {
			currentFilteredPortfolios = currentFilteredPortfolios.filter(
				(portfolio) => portfolio.genre === activeTab
			);
		}

		// [2차 필터링] 검색어가 입력되어 있다면 제목(Title)에서 포함 여부 확인 (대소문자 구분 X)
		if (searchTerm !== "") {
			const lowercasedSearchTerm = searchTerm.toLowerCase();
			currentFilteredPortfolios = currentFilteredPortfolios.filter((portfolio) => (
				portfolio.title.toLowerCase().includes(lowercasedSearchTerm)
			));
		}

		return currentFilteredPortfolios;
	}, [searchTerm, activeTab, portfolios]);


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
	if (loading) return <div className="desc loading">포트폴리오를 불러오는 중입니다.</div>;

	// 조건부 렌더링: 에러 발생
	if (error) return <div className="desc error">에러: {error}</div>;

	return (
		<div className="desc">
			<div className="wrap-movie portfolio">
				{/* --- 상단: 사용자 프로필 헤더 --- */}
				<div className="header">
					<div className="people">
						<div className="thumb">
							<Image src="/images/ic-movie-profile.png" alt="커버이미지" width={80} height={80} />
						</div>
						<div className="info">
							<span>PortFolio</span>
							<strong>Channi</strong>
						</div>
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
						{filteredPortfolios.map((portfolio) => {

							return (
								<li key={portfolio.id}>
									<Link href={`/portfolio/${portfolio.id}`}>
										<div className="thumb" style={{ background: portfolio.gradation }}>
											<img src={portfolio.imageUrl} alt={portfolio.title}/>
										</div>
										<div className="subject">
											{portfolio.title}
										</div>
									</Link>
								</li>
							);
						})}
						{/* 검색 결과가 0건일 때의 예외 처리 */}
						{filteredPortfolios.length === 0 && searchTerm !== "" && (
							<li className="nodata">No Data.</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}