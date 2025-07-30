import Image from "next/image";
import Link from "next/link";

export default function Header() {
	return (
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
								<Link href="/movie">Movie</Link>
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
	)
}