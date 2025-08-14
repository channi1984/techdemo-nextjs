
import Image from "next/image";
import Link from "next/link";

export default function Music() {
	return (
		<div className="desc">
			{/* 뮤직 */}
			<div className="wrap-music">
				{/* 커버 */}
				<div className="cover">
					<div className="title">
						<strong>JOHN WICK</strong>
					</div>
					<div className="info">
						<div className="util">
							<ul>
								<li className="like">
									<button type="button" className="btn-like">좋아요</button>
								</li>
								<li className="share">
									<button type="button" className="btn-share">공유하기</button>
								</li>
							</ul>
						</div>
						<div className="play">
							<ul>
								<li className="play">
									<button type="button" className="btn-play">재생하기</button>
								</li>
								<li className="shuffle">
									<button type="button" className="btn-shuffle">셔플재생</button>
								</li>
								<li className="more">
									<button type="button" className="btn-more">추가 메뉴</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}