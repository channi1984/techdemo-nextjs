"use client";

import { useEffect } from 'react';

export default function FastClickInitializer() {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			try {
				// 'fastclick' 모듈을 불러옵니다.
				// 최신 버전의 fastclick은 attach 함수를 바로 내보냅니다.
				const fastClickAttach = require('fastclick');

				// fastClickAttach 변수가 함수인지 확인
				if (typeof fastClickAttach === 'function') {
					fastClickAttach(document.body);
					console.log("FastClick이 성공적으로 초기화되었습니다.");
				} else {
					console.error("FastClick 모듈이 함수가 아닙니다. 라이브러리 버전 확인 필요.");
				}
			} catch (error) {
				console.error("FastClick 모듈 로드 중 오류 발생:", error);
			}
		}
	}, []);

	return null;
}