import Image from "next/image";
import Link from "next/link";

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
						<div className="left">
							<div className="logo">
								<Link href="/">
									<Image src="/images/ic-logo.png" alt="로고" width={356} height={44} />
								</Link>
							</div>
							<div className="menu">
								<ul>
									<li>
										<Link href="/features">Features</Link>
									</li>
									<li>
										<Link href="/specifications">Specifications</Link>
									</li>
									<li>
										<Link href="/reviews">Reviews</Link>
									</li>
									<li>
										<Link href="/support">Support</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="right">
							<div className="util">
								<div className="price">
									<span>Starting from</span>
									<span className="dolor">$999</span>
								</div>
								<div className="buy">
									<button type="button">Buy now</button>
								</div>
							</div>
						</div>
					</div>
				</header>

				{/* 바디 */}
				<main className="wrap-con">
					<div className="area">
						<div className="wrap-main">
							<div className="cart">
								<div className="title">
									<strong>TechMaster Pro</strong>
									<p>$999</p>
								</div>

								<div className="color">
									<ul>
										<li className="color1">
											<button type="button"></button>
										</li>
										<li className="color2">
											<button type="button"></button>
										</li>
										<li className="color3">
											<button type="button"></button>
										</li>
										<li className="color4">
											<button type="button"></button>
										</li>
									</ul>
								</div>

								<div className="size">
									<ul>
										<li>
											<button type="button">medium</button>
										</li>
										<li>
											<button type="button">medium</button>
										</li>
										<li>
											<button type="button">medium</button>
										</li>
									</ul>
								</div>

								<div className="add">
									<button type="button">Add to cart</button>
								</div>

								<div className="detail detail1">
									<strong>Product Details</strong>
									<p>This is the latest model with cutting-edge technology.</p>
								</div>

								<div className="detail">
									<strong>Specifications</strong>
									<p>6.8-inch display, 20MP camera, 5500mAh battery</p>
								</div>
							</div>

							{children}
						</div>
					</div>
				</main>
			</body>
		</html>
	);
}
