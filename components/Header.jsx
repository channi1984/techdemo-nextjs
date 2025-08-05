"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
	const pathname = usePathname();

	//pathname이 "/movie" 또는 "movie/1" 등 movie로 시작하는지 확인
	const isMovieActive = pathname.startsWith('/movie/') || pathname === "/movie";
	const isMovieApiActive = pathname.startsWith('/movie_api/') || pathname === "/movie_api";

	return (
		<header className="wrap-header">
			<div className="area">
				<div className="left">
					<div className="logo">
						<Link href="/">
							CHANNI.KR
						</Link>
					</div>
					<div className="menu">
						<ul>
							<li className={isMovieActive ? "on" : ""}>
								<Link href="/movie">Movie</Link>
							</li>
							<li className={isMovieApiActive ? "on" : ""}>
								<Link href="/movie_api">Movie by Api</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="right">
					<div className="util">
						<div className="price">
							<span>Author</span>
							<span className="dolor">Channi</span>
						</div>
						<div className="buy">
							<button type="button">Button</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}