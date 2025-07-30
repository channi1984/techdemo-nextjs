import Image from "next/image";

export default function MovieDetail() {
	return (
		<div className="desc">
			{/* 무비 디테일 */}
			<div className="wrap-movie-detail">
				{/* 영화 표지 */}
				<div className="thumb">
					<Image src="/images/img-movie-detail.png" alt="커버 이미지" width={860} height={964} />
					<div className="play">
						<button type="button">플레이 버튼</button>
					</div>
				</div>

				<div className="badge">
					<ul>
						<li>+18</li>
						<li>action</li>
						<li className="star"><Image src="/images/ic-movie-star.png" alt="커버 이미지" width={48} height={48} /> 5.0</li>
					</ul>
					<button type="button" className="like">
						<Image src="/images/ic-movie-like.png" alt="하트 이미지" width={50} height={45} />
					</button>
				</div>

				<div className="info">
					<div className="title">
						Under Paris
					</div>
					<div className="desc">
						To save Paris from a bloodbath, a grieving scientist is forced to face her
						tragic past when a giant shark appears in the Seine. <strong>Show More</strong>
					</div>
				</div>

				<div className="actor">
					<div className="title">
						Actors
					</div>
					<div className="list">
						<ul>
							<li>
								<div className="thumb">
									<Image src="/images/img-movie-actor.png" alt="배우 이미지" width={216} height={216} />
								</div>
								<div className="name">
									Nassim Lyes
								</div>
							</li>

							<li>
								<div className="thumb">
									<Image src="/images/img-movie-actor.png" alt="배우 이미지" width={216} height={216} />
								</div>
								<div className="name">
									Nassim Lyes
								</div>
							</li>

							<li>
								<div className="thumb">
									<Image src="/images/img-movie-actor.png" alt="배우 이미지" width={216} height={216} />
								</div>
								<div className="name">
									Nassim Lyes
								</div>
							</li>

							<li>
								<div className="thumb">
									<Image src="/images/img-movie-actor.png" alt="배우 이미지" width={216} height={216} />
								</div>
								<div className="name">
									Nassim Lyes
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div className="button">
					<button type="button">Open</button>
				</div>
			</div>
		</div>
	);
}
