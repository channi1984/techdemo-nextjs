import "./globals.css";
import "./style.css"

import Header from "@/components/Header";
import ViewportChanger from "@/components/ViewportChanger";

export const viewport = {
	initialScale: 1.0,
	maximumScale: 1.0,
}

export const metadata = {
	title: "Channi.kr",
	description: 'Welcome to Channi.kr',
	icons: {
		icon: '/favicon.png',
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="ko">
			<body>
				{/* 뷰 포트 */}
				<ViewportChanger />
				{/* 헤더 */}
				<Header />

				{/* 바디 */}
				<main className="wrap-con">
					<div className="area">
						<div className="wrap-main">
							<div className="cart">
								<div className="title">
									<strong>TECHDOMO PAGE</strong>
									<p>by Next JS</p>
								</div>

								<div className="size">
									<ul>
										<li>
											<button type="button">button</button>
										</li>
										<li>
											<button type="button">button</button>
										</li>
										<li>
											<button type="button">button</button>
										</li>
									</ul>
								</div>

								<div className="add">
									<button type="button">Button</button>
								</div>

								<div className="detail detail1">
									<strong>Description</strong>
									<p>This is Next JS Techdemo page.</p>
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
