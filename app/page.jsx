import Image from "next/image";

export default function Main() {
	return (
		<div className="desc">
			<div className="big-font">
				<span>
					Experience the<br />
					Future of<br />
				</span>
				MOBILE<br />
				TECHNOLOGY
			</div>

			<div className="big-img">
				<Image src="/images/img-big.png" alt="이미지" width={1793} height={1345} />
			</div>

			<div className="model">
				<div className="title">
					Compare Our Models
				</div>

				<div className="list">
					<ul>
						<li>
							<div className="thumb">
								<Image src="/images/img-thumb.png" alt="썸네일 이미지" width={505} height={505} />
							</div>
							<div className="info">
								<span>Model A</span>
								<strong>$699</strong>
								<button type="button">Buy Now</button>
							</div>
							<div className="icons">
								<div className="box">
									<div className="icon">
										<Image src="/images/ic-phone3.png" alt="아이콘" width={121} height={100} />
									</div>
									<strong>Camera</strong>
									<p>12MP</p>
								</div>
								<div className="box">
									<div className="icon">
										<Image src="/images/ic-phone3.png" alt="아이콘" width={121} height={100} />
									</div>
									<strong>Camera</strong>
									<p>12MP</p>
								</div>
								<div className="box">
									<div className="icon">
										<Image src="/images/ic-phone3.png" alt="아이콘" width={121} height={100} />
									</div>
									<strong>Camera</strong>
									<p>12MP</p>
								</div>
							</div>
						</li>

						<li>
							<div className="thumb">
								<Image src="/images/img-thumb.png" alt="썸네일 이미지" width={505} height={505} />
							</div>
							<div className="info">
								<span>Model A</span>
								<strong>$699</strong>
								<button type="button">Buy Now</button>
							</div>
							<div className="icons">
								<div className="box">
									<div className="icon">
										<Image src="/images/ic-phone3.png" alt="아이콘" width={121} height={100} />
									</div>
									<strong>Camera</strong>
									<p>12MP</p>
								</div>
								<div className="box">
									<div className="icon">
										<Image src="/images/ic-phone3.png" alt="아이콘" width={121} height={100} />
									</div>
									<strong>Camera</strong>
									<p>12MP</p>
								</div>
								<div className="box">
									<div className="icon">
										<Image src="/images/ic-phone3.png" alt="아이콘" width={121} height={100} />
									</div>
									<strong>Camera</strong>
									<p>12MP</p>
								</div>
							</div>
						</li>

						<li>
							<div className="thumb">
								<Image src="/images/img-thumb.png" alt="썸네일 이미지" width={505} height={505} />
							</div>
							<div className="info">
								<span>Model A</span>
								<strong>$699</strong>
								<button type="button">Buy Now</button>
							</div>
							<div className="icons">
								<div className="box">
									<div className="icon">
										<Image src="/images/ic-phone3.png" alt="아이콘" width={121} height={100} />
									</div>
									<strong>Camera</strong>
									<p>12MP</p>
								</div>
								<div className="box">
									<div className="icon">
										<Image src="/images/ic-phone3.png" alt="아이콘" width={121} height={100} />
									</div>
									<strong>Camera</strong>
									<p>12MP</p>
								</div>
								<div className="box">
									<div className="icon">
										<Image src="/images/ic-phone3.png" alt="아이콘" width={121} height={100} />
									</div>
									<strong>Camera</strong>
									<p>12MP</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
