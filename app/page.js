import Image from "next/image";

export default function Main() {
	return (
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

				<div className="detail">
					<strong>Product Details</strong>
					<p>This is the latest model with cutting-edge technology.</p>
				</div>

				<div className="detail">
					<strong>Specifications</strong>
					<p>6.8-inch display, 20MP camera, 5500mAh battery</p>
				</div>
			</div>
			<div className="desc">
				제품 소개
			</div>
		</div>
	);
}
