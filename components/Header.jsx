"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
	const pathname = usePathname();

	//pathname이 "/movie" 또는 "movie/1" 등 movie로 시작하는지 확인
	const isMovieActive = pathname.startsWith('/movie_dummy/') || pathname === "/movie_dummy";
	const isMovieApiActive = pathname.startsWith('/movie/') || pathname === "/movie";
	const isTodoListActive = pathname.startsWith('/todolist/') || pathname === "/todolist";
	const isMusicActive = pathname.startsWith('/music/') || pathname === "/music";

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
							{/* <li className={isMovieActive ? "on" : ""}>
								<Link href="/movie_dummy">Movie</Link>
							</li> */}
							<li className={isMovieApiActive ? "on" : ""}>
								<Link href="/movie">Movie</Link>
							</li>
							<li className={isMusicActive ? "on" : ""}>
								<Link href="/music">Music</Link>
							</li>
							<li className={isTodoListActive ? "on" : ""}>
								<Link href="/todolist">Todo List</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="right">
					<div className="util">
						<div className="price">
							<span>Developer</span>
							<span className="dolor">Channi84</span>
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