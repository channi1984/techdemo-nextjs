"use client";

import { useEffect } from 'react';

export default function FastClickInitializer() {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			import('fastclick').then((FastClick) => {
				FastClick.attach(document.body);
			});
		}
	}, []);

	return null; // UI를 렌더링하지 않습니다.
}