import Image from "next/image";
import Link from "next/link";

export default function Header() {
	return (
		<header className="wrap-header">
			<div className="area">
				<div className="left">
					<div className="logo">
						<Link href="/">
							TECHDEMO
						</Link>
					</div>
					<div className="menu">
						<ul>
							<li>
								<Link href="/movie">Movie</Link>
							</li>
							<li>
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