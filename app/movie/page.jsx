import Image from "next/image";
import Link from "next/link";
import movies from "@/data/moviesData";

export default function MovieFeatures() {
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
					<input type="text" placeholder="Search" />
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
						{movies.map((movie) => (
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
					</ul>
				</div>
			</div>
		</div>
	);
}
