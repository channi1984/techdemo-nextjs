
import Image from "next/image";
import Link from "next/link";

export default function Music() {
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
							<Image src="/images/img-music-player.png" alt="플레이어" width={80} height={80} />
						</div>
					</div>
					<div className="title">
						<strong>JOHN WICK</strong>
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
							<em>15</em> Songs
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
								<li>
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
												<Image src="/images/img-music-cover.png" alt="커버이미지" width={128} height={128} />
											</div>
											<div className="subject">
												<strong>Big Wick Energy</strong>
												<p>Tyler Bates, Joel J. Richard</p>
											</div>
										</div>
									</div>
									<div className="album">
										John Wick Chapter 4
									</div>
									<div className="time">
										3:15
									</div>
								</li>

								<li>
									<div className="num">
										<span>2</span>
										<div className="play">
											<button type="button" className="btn-play">
												<Image src="/images/ic-music-play.png" alt="플레이" width={42} height={50} />
											</button>
										</div>
									</div>
									<div className="title">
										<div className="music">
											<div className="thumb">
												<Image src="/images/img-music-cover.png" alt="커버이미지" width={128} height={128} />
											</div>
											<div className="subject">
												<strong>Nowhere To Run</strong>
												<p>Tyler Bates, Joel J. Richard</p>
											</div>
										</div>
									</div>
									<div className="album">
										John Wick Chapter 4
									</div>
									<div className="time">
										2:11
									</div>
								</li>

								<li>
									<div className="num">
										<span>3</span>
										<div className="play">
											<button type="button" className="btn-play">
												<Image src="/images/ic-music-play.png" alt="플레이" width={42} height={50} />
											</button>
										</div>
									</div>
									<div className="title">
										<div className="music">
											<div className="thumb">
												<Image src="/images/img-music-cover.png" alt="커버이미지" width={128} height={128} />
											</div>
											<div className="subject">
												<strong>Sand Wick</strong>
												<p>Tyler Bates, Joel J. Richard</p>
											</div>
										</div>
									</div>
									<div className="album">
										John Wick Chapter 4
									</div>
									<div className="time">
										5:12
									</div>
								</li>

								<li>
									<div className="num">
										<span>4</span>
										<div className="play">
											<button type="button" className="btn-play">
												<Image src="/images/ic-music-play.png" alt="플레이" width={42} height={50} />
											</button>
										</div>
									</div>
									<div className="title">
										<div className="music">
											<div className="thumb">
												<Image src="/images/img-music-cover.png" alt="커버이미지" width={128} height={128} />
											</div>
											<div className="subject">
												<strong>Change Your Nature</strong>
												<p>Tyler Bates, Joel J. Richard</p>
											</div>
										</div>
									</div>
									<div className="album">
										John Wick Chapter 4
									</div>
									<div className="time">
										4:23
									</div>
								</li>

								<li>
									<div className="num">
										<span>5</span>
										<div className="play">
											<button type="button" className="btn-play">
												<Image src="/images/ic-music-play.png" alt="플레이" width={42} height={50} />
											</button>
										</div>
									</div>
									<div className="title">
										<div className="music">
											<div className="thumb">
												<Image src="/images/img-music-cover.png" alt="커버이미지" width={128} height={128} />
											</div>
											<div className="subject">
												<strong>Continental Breakfast</strong>
												<p>Tyler Bates, Joel J. Richard</p>
											</div>
										</div>
									</div>
									<div className="album">
										John Wick Chapter 4
									</div>
									<div className="time">
										2:15
									</div>
								</li>
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