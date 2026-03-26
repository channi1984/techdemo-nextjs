"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function PortfolioDetail() {
	const params = useParams();
	// 동적 라우팅 경로인 [detail]에서 영화 ID를 추출 /portfolio/[1]
	const { detail } = params;

	// 영화 상세 정보 데이터
	const [portfolio, setPortfolio] = useState(null);
	// 초기 로딩 상태
	const [loading, setLoading] = useState(true);
	// 에러 메세지
	const [error, setError] = useState(null);

	// API 데이터 통신 함수
	async function fetchPortfolio() {
		try {
			setLoading(true);
			const response = await fetch(`/api/portfolio/${detail}`);
			const data = await response.json();
			setPortfolio(data);
		} catch (e) {
			setError("포트폴리오를 불러오는 데 실패했습니다.");
		} finally {
			setLoading(false);
		}
	}

	// [useEffect] 영화 ID(detail)가 바뀔 때마다 영화 상세 정보를 새로 가져옴
	useEffect(() => {
		if (!detail) { setLoading(false); return; }
		fetchPortfolio();
	}, [detail]);

	// 예외 상황 처리 렌더링
	if (loading) {
		return <div className="desc loading">포트폴리오를 불러오는 중입니다...</div>;
	}

	if (error) {
		return <div className="desc error">에러: {error}</div>;
	}

	if (!portfolio) {
		return <div className="desc loading">해당 포트폴리오가 없습니다.</div>;
	}

	// 메인 UI 렌더링
	return (
		<div className="desc">
			{/* --- 상단: 영화 상세 영역 --- */}
			<div className="wrap-movie-detail portfolio">
				<div className="thumb">
					<img src={portfolio.imageDetailUrl} alt={portfolio.title}/>
				</div>

				<div className="badge">
					<div className="info">
						<div className="util">
							<ul>
								<li>{portfolio.genre}</li>
								<li>{portfolio.scope}</li>
								<li>{portfolio.contribute}</li>
								<li>{portfolio.period}</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="info">
					<div className="title">
						{portfolio.title}
					</div>
					<div className="text">
						{portfolio.description}
					</div>
					<div className="point">
						[{portfolio.features}]
					</div>
				</div>

				<div className="button">
					<a href={portfolio.url} target="_blank" title="새창" className="btn-port">VIEW LIVE</a>
				</div>
			</div>
		</div>
	);
}