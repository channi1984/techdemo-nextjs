"use client";

import { useEffect } from "react";

export default function ViewportChanger() {
	useEffect(() => {
		let viewportTag = document.querySelector('meta[name="viewport"]');
		if (!viewportTag) {
			viewportTag = document.createElement('meta');
			viewportTag.name = 'viewport';
			document.head.appendChild(viewportTag);
		}

		// 화면 넓이에 따라 뷰포트 변경을 진행
		function setViewport() {
			const screenWidth = screen.width;
			let content = '';

			if (screenWidth > 1024) {
				content = 'width=1800, user-scalable=no';
			} else if (screenWidth > 600) {
				content = 'width=1100, user-scalable=no';
			} else {
				content = 'width=480, user-scalable=yes';
			}

			viewportTag.setAttribute('content', content);
		}

		setViewport(); //마운트 직후 실행

		window.addEventListener('resize', setViewport);

		return () => {
			window.removeEventListener('resize', setViewport);
		}
	}, []);

	return null; //이 컴포넌트는 시각적인 요소를 렌더링 하지 않습니다.
}