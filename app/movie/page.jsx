import Image from "next/image";
import Link from "next/link";

export default function MovieFeatures() {
	return (
		<div className="desc">
			{/* 무비 */}
			<div className="wrap-movie">
				{/* 헤더 */}
				<div className="header">
					<div className="people">
						<div className="thumb">

						</div>
						<div className="info">
							<span>Welcome back</span>
							<strong>Aymen Missaoui</strong>
						</div>
					</div>

					<div className="menu">
						<button type="button"></button>
					</div>
				</div>

				{/* 서치 */}
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

				{/* 리스트 */}
				<div className="list">
					<ul>
						<li>
							<Link href="">
								<div className="thumb">
									
								</div>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
