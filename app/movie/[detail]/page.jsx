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
                setMovie(data);
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