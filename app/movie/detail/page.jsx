import Image from "next/image";

export default function MovieDetail() {
	return (
		<div className="desc">
			{/* 무비 디테일 */}
			<div className="wrap-movie-detail">
				{/* 영화 표지 */}
				<div className="thumb">
					<Image src="/images/img-movie.png" alt="커버 이미지" width={860} height={964} />
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
			</div>
		</div>
	);
}
