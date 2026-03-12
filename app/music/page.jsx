"use client";

import Image from "next/image";

import { useState, useEffect, useRef } from 'react';

export default function Music() {
	// 검색창에 입력된 텍스트 상태
	const [searchTerm, setSearchTerm] = useState("");
	// 서버(API)로부터 받아온 전체 음악 데이터 리스트
	const [musics, setMusics] = useState([]);
	// 데이터 로딩 중 여부 (true일 때 로딩 화면 표시)
	const [loading, setLoading] = useState(true);
	// 에러 발생 시 에러 메시지 저장
	const [error, setError] = useState(null);
	// 검색어에 의해 필터링된 실제 화면에 보여줄 음악 리스트
	const [filteredMusics, setFilteredMusics] = useState([]);
	// 페이지 상단에 표시될 메인 제목
	const [pageTitle, setPageTitle] = useState();
	// 사용자 프로필 이미지(아바타) 경로
	const [userAvatar, setUserAvatar] = useState();
	// 현재 재생 중인 음악 객체 정보
	const [currentMusic, setCurrentMusic] = useState(null);
	// 음악이 재생 중인지(Play) 멈췄는지(Pause) 상태
	const [isPlaying, setIsPlaying] = useState(false);
	// <audio> HTML 요소를 직접 제어하기 위한 참조 변수
	const audioRef = useRef(null);

	// 초기 데이터 로드 (Data Fetching) -
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
			} finally {
				setLoading(false);
			}
		}
		fetchMusics();

		// 오디오 이벤트 리스너 설정: 음악이 끝났을 때 재생 상태를 false로 변경
		const audioEl = audioRef.current;
		if (audioEl) {
			const handleEnded = () => {
				setIsPlaying(false);
			};

			audioEl.addEventListener('ended', handleEnded);
			// 컴포넌트 언마운트 시 리스너 제거 (메모리 누수 방지)
			return () => {
				audioEl.removeEventListener('ended', handleEnded);
			};
		}
	}, []);

	// 검색어 필터
	useEffect(() => {
		let currentFilteredMusics = musics;
		console.log(searchTerm)
		// 검색어가 있을 경우 제목에서 해당 키워드 포함 여부 확인 (대소문자 구분 없음)
		if (searchTerm !== "") {
			const lowercasedSearchTerm = searchTerm.toLowerCase();
			currentFilteredMusics = currentFilteredMusics.filter((music) => (
				music.title.toLowerCase().includes(lowercasedSearchTerm)
			));
		}
		// 필터링된 결과를 상태에 저장하여 UI 업데이트 트리거
		setFilteredMusics(currentFilteredMusics);
	}, [searchTerm, musics]);

	// 검색어 핸들러
	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	}

	// 음악 재생 핸들러
	const handlePlayMusic = (music) => {
		// 현재 클릭한 음악이 이미 재생/일시정지 중인 음악인 경우
		if (currentMusic && currentMusic.id === music.id) {
			if (isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			} else {
				audioRef.current.play().then(() => {
					setIsPlaying(true);
				}).catch(e => {
					console.error("재생 오류:", e);
					setIsPlaying(false);
				});
			}
		}
		// 새로운 음악을 클릭한 경우
		else {
			setCurrentMusic(music);
			// 오디오 소스 변경
			audioRef.current.src = music.mp3;

			audioRef.current.play().then(() => {
				setIsPlaying(true);
			}).catch(e => {
				console.error("재생 오류:", e);
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

		// 현재 리스트에서의 위치 찾기
		const currentIndex = filteredMusics.findIndex(
			(music) => music.id === currentMusic.id
		);

		// 다음 곡 인덱스 (마지막 곡이면 다시 0번으로 순환)
		const nextIndex = (currentIndex + 1) % filteredMusics.length;
		const nextMusic = filteredMusics[nextIndex];

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

		// 이전 곡 인덱스 (첫 곡이면 마지막 곡으로 순환)
		let prevIndex = currentIndex - 1;
		if (prevIndex < 0) {
			prevIndex = filteredMusics.length - 1; // 첫 곡일 경우 마지막 곡으로 이동
		}

		// 이전 음악 객체 가져오기
		const prevMusic = filteredMusics[prevIndex];

		// 이전 음악 재생
		handlePlayMusic(prevMusic);
	}


	// 조건부 렌더링: 로딩 중
	if (loading) return <div className="desc loading">음악 데이터를 불러오는 중입니다.</div>;

	// 조건부 렌더링: 에러 발생 시
	if (error) return <div className="desc error">에러: {error}</div>;

	return (
		<div className="desc">
			{/* 실제 소리를 내는 숨겨진 오디오 태그 */}
			<audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

			<div className="wrap-music">
				{/* 상단 커버 섹션: 제목 및 사용자 정보 */}
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

				{/* 하단 플레이리스트 섹션: 검색 및 목록 */}
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
													{/* 현재 곡이 재생 중일 때만 일시정지 아이콘 표시 */}
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
								{/* 검색 결과가 없을 경우 노출되는 메시지 */}
								{filteredMusics.length === 0 && searchTerm !== "" && (
									<li className="nodata">No Data.</li>
								)}
							</ul>
						</div>
					</div>
				</div>

				{/* 재생 바 (Play Bar): 현재 재생 중인 곡이 있을 때만 하단에 고정 표시 */}
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
												{/* 전체 재생 버튼 이미지 교체 */}
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