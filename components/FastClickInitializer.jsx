"use client";

import { useEffect } from 'react';

export default function FastClickInitializer() {
	useEffect(() => {
		// 브라우저 환경에서만 동적으로 'fastclick'을 불러와서 실행합니다.
		if (typeof window !== 'undefined') {
			import('fastclick').then((FastClick) => {
				FastClick.attach(document.body);
			});
		}
	}, []);

	return null; // UI를 렌더링하지 않습니다.
}