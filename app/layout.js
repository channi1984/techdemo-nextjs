import Image from "next/image";

import "./globals.css";
import "./style.css"

export const metadata = {
	title: "Next JS TechDemo",
};

export default function RootLayout({ children }) {
	return (
		<html lang="ko">
			<body>
				{/* 헤더 */}
				<header className="wrap-header">
					<div className="area">
						<div className="logo">
							<Image src="/images/ic-logo.png" alt="로고" width={356} height={44} />
						</div>
						<div className="menu">
							<ul>
								<li>
									<a href="#link">Features</a>
								</li>
								<li>
									<a href="#link">Specifications</a>
								</li>
								<li>
									<a href="#link">Reviews</a>
								</li>
								<li>
									<a href="#link">Support</a>
								</li>
							</ul>
						</div>
						<div className="util">
							<div className="price">
								<span>Starting from</span>
								<span>$999</span>
							</div>
							<div className="buy">
								<button type="button">Buy now</button>
							</div>
						</div>
					</div>
				</header>

				{/* 바디 */}
				<main className="wrap-con">
					<div className="area">
						{children}
					</div>
				</main>
			</body>
		</html>
	);
}
