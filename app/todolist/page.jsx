"use client";

import Image from "next/image";

import { useState } from "react";

export default function TodoList() {
	const [isChecked, setIsChecked] = useState(false);

	const hanldeChange = (e) => {
		setIsChecked(e.target.checked);
	}

	return (
		<div className="desc">
			{/* 투두 리스트 */}
			<div className="wrap-todo">
				<div className="header">
					<div className="logo">
						<Image src="/images/ic-todo.png" alt="Todo 아이콘" width={252} height={96} />
					</div>
					<div className="search">
						<div className="input">
							<input type="text" placeholder="할 일을 입력해 주세요." />
						</div>
						<div className="button">
							<button type="button">추가</button>
						</div>
					</div>
				</div>

				<div className="state">
					<div className="total">
						생성된 할 일
						<span>5</span>
					</div>
					<div className="complete">
						완료된 할 일
						<span>2</span>
					</div>
				</div>

				<div className="list">
					<div className="work">
						<ul>
							<li>
								<div className="checkbox">
									<input type="checkbox" name="check1" id="check1" />
								</div>
								<div className="subject">
									<strong>쇼핑 하기</strong>
								</div>
								<div className="del">
									<button type="button" className="btn-del">삭제하기</button>
								</div>
							</li>

							<li>
								<div className="checkbox">
									<input type="checkbox" name="check1" id="check1" />
								</div>
								<div className="subject">
									<strong>레고 만들기</strong>
								</div>
								<div className="del">
									<button type="button" className="btn-del">삭제하기</button>
								</div>
							</li>

							<li>
								<div className="checkbox">
									<input type="checkbox" name="check1" id="check1" />
								</div>
								<div className="subject">
									<strong>자전거 수리하기</strong>
								</div>
								<div className="del">
									<button type="button" className="btn-del">삭제하기</button>
								</div>
							</li>

							<li>
								<div className="checkbox">
									<input type="checkbox" name="check1" id="check1" checked={isChecked} onChange={setIsChecked}/>
								</div>
								<div className="subject">
									<strong>디아블로 하기</strong>
								</div>
								<div className="del">
									<button type="button" className="btn-del">삭제하기</button>
								</div>
							</li>

							<li>
								<div className="checkbox">
									<input type="checkbox" name="check1" id="check1" checked={isChecked} onChange={setIsChecked}/>
								</div>
								<div className="subject">
									<strong>TV 사기</strong>
								</div>
								<div className="del">
									<button type="button" className="btn-del">삭제하기</button>
								</div>
							</li>
						</ul>
					</div>
					<div className="empty">
						<div className="ico">
							<Image src="/images/ic-todo-empty.png" alt="할일 아이콘" width={112} height={112} />
						</div>
						<div className="text">
							아직 등록된 할 일이 없습니다.<br />
							할 일을 추가해 주세요.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}