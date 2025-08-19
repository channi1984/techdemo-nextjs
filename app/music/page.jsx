"use client";

import Image from "next/image";

import { useState, useEffect, useRef } from 'react';

export default function Music() {
	// 검색어 상태
	const [searchTerm, setSearchTerm] = useState("");
	// API에서 가져온 뮤직 목록 상태
	const [musics, setMusics] = useState([]);
	// 로딩 상태
	const [loading, setLoading] = useState(true);
	// 에러 상태
	const [error, setError] = useState(null);
	// 검색어 입력 상태
	const [filteredMusics, setFilteredMusics] = useState([]);
	// 큰 제목 상태
	const [pageTitle, setPageTitle] = useState();
	// 아바타 상태
	const [userAvatar, setUserAvatar] = useState();
	// 현재 재생중인 음악 상태
	const [currentMusic, setCurrentMusic] = useState(null);
	// 재생 상태
	const [isPlaying, setIsPlaying] = useState(false);
	// <audio> 태그에 접근하기 위한 ref
	const audioRef = useRef(null);

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
				setFilteredMusics(data.musics);
			} catch (e) {
				throw new Error("음악 데이터를 불러오는 데 실패했습니다.");
				console.error("Fetch error:", e);
			} finally {
				setLoading(false);
			}
		}
		fetchMusics();
	}, []);

	// 검색어 필터
	useEffect(() => {
		let currentFilteredMusics = musics;
		console.log(searchTerm)
		// 검색어 필터링
		if (searchTerm !== "") {
			const lowercasedSearchTerm = searchTerm.toLowerCase();
			currentFilteredMusics = currentFilteredMusics.filter((music) => (
				music.title.toLowerCase().includes(lowercasedSearchTerm)
			));
		}
		setFilteredMusics(currentFilteredMusics);
	}, [searchTerm, musics]);

	// 검색어 핸들러
	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	}

	// 음악 재생 핸들러
	const handlePlayMusic = (music) => {
		if (currentMusic && currentMusic.id === music.id) {
			// 같은 음악을 다시 클릭했을 경우
			if (isPlaying) {
				audioRef.current.pause(); // 재생 중이면 일시정지
			} else {
				audioRef.current.play(); // 정지 상태명 재생
			}
			setIsPlaying(!isPlaying); // 재생 상태 토글
		} else {
			// 다른 음악을 클랙했을 경우
			setCurrentMusic(music); // 현재 음악을 업데이트
			setIsPlaying(true); // 재생 상태를 true로 설정
			audioRef.current.src = music.mp3; // audio 태그의 소스를 변경
			audioRef.current.play().catch(e => {
				console.error("재생 오류", e);
				setIsPlaying(false);
			});
		}
	};

	// 다음 음악 재생 핸들러
	const handlePlayNextMusic = () => {
		// 현재 재생 중인 음악이 없을 경우 함수 종료
		if (!currentMusic) {
			return;
		}

		// 현재 음악의 인덱스 찾기
		const currentIndex = filteredMusics.findIndex(
			(music) => music.id === currentMusic.id
		);

		// 다음 인덱스 계산
		const nextIndex = (currentIndex + 1) % filteredMusics.length;

		// 다음 음악 객체 가져오기
		const nextMusic = filteredMusics[nextIndex];

		// 다음 음악 재생
		handlePlayMusic(nextMusic);
	}

	// 이전 음악 재생 핸들러
	const handlePlayPrevMusic = () => {
		// 현재 재생 중인 음악이 없을 경우 함수 종료
		if (!currentMusic) {
			return;
		}

		// 현재 음악의 인덱스 찾기
		const currentIndex = filteredMusics.findIndex(
			(music) => music.id === currentMusic.id
		);

		// 이전 인덱스 계산 (음수가 되지 않도록 수정)
		let prevIndex = currentIndex - 1;
		if (prevIndex < 0) {
			prevIndex = filteredMusics.length - 1; // 첫 곡일 경우 마지막 곡으로 이동
		}

		// 이전 음악 객체 가져오기
		const prevMusic = filteredMusics[prevIndex];

		// 이전 음악 재생
		handlePlayMusic(prevMusic);
	}


	// 로딩중
	if (loading) return <div className="desc loading">음악 데이터를 불러오는 중입니다.</div>;

	// 에러남
	if (error) return <div className="desc error">에러: {error}</div>;

	return (
		<div className="desc">
			<audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
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
							<input type="text"
								className="inp-search"
								placeholder="Search"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
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
								{/* filteredMusics를 사용하여 렌더링합니다. */}
								{filteredMusics.map((music) => (
									<li key={music.id} className={currentMusic?.id === music.id ? 'active' : ''} onClick={() => handlePlayMusic(music)}>
										<div className="num">
											<span>{music.id}</span>
											<div className="play">
												<button type="button" className="btn-play">
													{currentMusic?.id === music.id && isPlaying ? (
														<Image src="/images/ic-music-pause.png" alt="정지" width={42} height={50} />
													) : (
														<Image src="/images/ic-music-play.png" alt="플레이" width={42} height={50} />
													)}
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
								{/* 검색 결과가 없을 때 메세지 표시 */}
								{filteredMusics.length === 0 && searchTerm !== "" && (
									<li className="nodata">No Data.</li>
								)}
							</ul>
						</div>
					</div>
				</div>

				{/* 현재 음악이 있을 때만 플레이마 표시 */}
				{currentMusic && (
					<div className="play-bar">
						<div className="bar-cover">
							<div className="thumb">
								<Image src={currentMusic.cover} alt={currentMusic.title} width={128} height={128} />
							</div>
							<div className="subject">
								<strong>{currentMusic.title}</strong>
								<p>{currentMusic.artist}</p>
							</div>
						</div>

						<div className="bar-control">
							<ul>
								<li className="shuffle">
									<button type="button" className="btn-shuffle">
										<Image src="/images/ic-music-shuffle.png" alt="반복 재생" width={64} height={64} />
									</button>
								</li>
								<li className="control">
									<ul>
										<li className="prev">
											<button type="button" className="btn-prev" onClick={handlePlayPrevMusic}>
												<Image src="/images/ic-music-bar-prev.png" alt="이전 재생" width={64} height={64} />
											</button>
										</li>
										<li className="play">
											<button type="button" className="btn-play" onClick={() => currentMusic && handlePlayMusic(currentMusic)}>
												<Image src={isPlaying ? "/images/ic-music-all-pause.png" : "/images/ic-music-all-play.png"} alt="재생/일시정지" width={160} height={160} />
											</button>
										</li>
										<li className="next">
											<button type="button" className="btn-next" onClick={handlePlayNextMusic}>
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
				)}
			</div>
		</div>
	);
}