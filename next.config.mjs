/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/movie',
				permanent: true, // 영구적인 이동이면 true
			},
		];
	},
};

export default nextConfig;