import { redirect } from 'next/navigation';

export default function Home() {
	// 사용자가 루트 URL ("/")로 접근하면 "/movie" 페이지로 리다이렉션
	redirect('/movie');
}