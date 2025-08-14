"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from 'react';

export default function Music() {
	// API에서 뮤직 목록 가져옴
	const [musics, setMusics] = useState([]);
	// 큰 제목
	const [pageTitle, setPageTitle] = useState();
	// 아바타
	const [userAvatar, setUserAvatar] = useState();
	// 로딩상태
	const [loading, setLoading] = useState(true);

	// Fetch
	useEffect(() => {
		async function fetchMusics() {
			try {
				setLoading(true);
				const response = await fetch('/api/musics');
				if (!response.ok) {
					throw new Error(`HTTP error! state: ${response.status}`);
				}

				const data = await response.json();
				setMusics(data.musics);
				setPageTitle(data.mainTitle);
				setUserAvatar(data.userAvatar);
			} catch (e) {
				throw new Error("음악 데이터를 불러오는 데 실패했습니다.");
				console.error("Fetch error:", e);
			} finally {
				setLoading(false);
			}
		}
		fetchMusics();
	}, []);

	//로딩중
	if (loading) return <div className="desc loading">음악 데이터를 불러오는 중입니다.</div>;

	return (
		<div className="desc">
			{/* 뮤직 */}
			<div className="wrap-music">
				{/* 커버 */}
				<div className="cover">
					<div className="header">
						<div className="noti">
							<button type="button" className="btn-noti">
								<Image src="/images/ic-music-noti.png" alt="알림" width={80} height={80} />
							</button>
						</div>
						<div className="player">
							<Image src={userAvatar} alt="플레이어" width={80} height={80} />
						</div>
					</div>
					<div className="title">
						<strong>{pageTitle}</strong>
					</div>
					<div className="info">
						<div className="util">
							<ul>
								<li className="like">
									<button type="button" className="btn-like">
										<Image src="/images/ic-music-like.png" alt="좋아요" width={50} height={46} />
									</button>
								</li>
								<li className="share">
									<button type="button" className="btn-share">
										<Image src="/images/ic-music-share.png" alt="공유하기" width={40} height={46} />
									</button>
								</li>
							</ul>
						</div>
						<div className="control">
							<ul>
								<li className="play">
									<button type="button" className="btn-play">
										<Image src="/images/ic-music-all-play.png" alt="플레이" width={160} height={160} />
									</button>
								</li>
								<li className="shuffle">
									<button type="button" className="btn-shuffle">
										<Image src="/images/ic-music-shuffle.png" alt="셔플 재생" width={54} height={54} />
									</button>
								</li>
								<li className="more">
									<button type="button" className="btn-more">
										<Image src="/images/ic-music-more.png" alt="더보기" width={14} height={54} />
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="play-list">
					<div className="util">
						<div className="total">
							<em>{musics.length}</em> Songs
						</div>
						<div className="search">
							<button type="button" className="btn-search">
								<Image src="/images/btn-music-search.png" alt="더보기" width={39} height={39} />
							</button>
							<input type="text" className="inp-search" />
						</div>
					</div>

					<div className="list">
						<div className="header">
							<div className="num">
								<Image src="/images/ic-music-sharp.png" alt="#" width={26} height={30} />
							</div>
							<div className="title">
								Title
							</div>
							<div className="album">
								Album
							</div>
							<div className="time">
								<Image src="/images/ic-music-time.png" alt="#" width={48} height={45} />
							</div>
						</div>

						<div className="body">
							<ul>
								{/* musics를 사용하여 렌더링합니다. */}
								{musics.map((music) => (
									<li key={music.id}>
										<div className="num">
											<span>1</span>
											<div className="play">
												<button type="button" className="btn-play">
													<Image src="/images/ic-music-play.png" alt="플레이" width={42} height={50} />
												</button>
											</div>
										</div>
										<div className="title">
											<div className="music">
												<div className="thumb">
													<Image src={music.cover} alt={music.title} width={128} height={128} />
												</div>
												<div className="subject">
													<strong>{music.title}</strong>
													<p>{music.artist}</p>
												</div>
											</div>
										</div>
										<div className="album">
											{music.album}
										</div>
										<div className="time">
											{music.time}
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				<div className="play-bar">
					<div className="bar-cover">
						<div className="thumb">
							<Image src="/images/img-music-cover.png" alt="커버이미지" width={128} height={128} />
						</div>
						<div className="subject">
							<strong>Big Wick Energy</strong>
							<p>Tyler Bates, Joel J. Richard</p>
						</div>
					</div>

					<div className="bar-control">
						<ul>
							<li className="shuffle">
								<button type="button" className="btn-shuffle">
									<Image src="/images/ic-music-shuffle.png" alt="셔플 재생" width={54} height={54} />
								</button>
							</li>
							<li className="control">
								<ul>
									<li className="prev">
										<button type="button" className="btn-prev">
											<Image src="/images/ic-music-bar-prev.png" alt="이전 재생" width={64} height={64} />
										</button>
									</li>
									<li className="play">
										<button type="button" className="btn-play">
											<Image src="/images/ic-music-all-play.png" alt="이전 재생" width={160} height={160} />
										</button>
									</li>
									<li className="next">
										<button type="button" className="btn-next">
											<Image src="/images/ic-music-bar-next.png" alt="다음 재생" width={64} height={64} />
										</button>
									</li>
								</ul>
							</li>
							<li className="repeat">
								<button type="button" className="btn-repeat">
									<Image src="/images/ic-music-repeat.png" alt="반복 재생" width={64} height={64} />
								</button>
							</li>
						</ul>
					</div>

					<div className="bar-util">
						<button type="button" className="btn-mute">
							<Image src="/images/ic-music-mute.png" alt="음소거" width={37} height={43} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}