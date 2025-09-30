import type { ProxyOptions } from 'vite';

export const proxy: Record<string, ProxyOptions> = {
	'/api': {
		target: 'http://localhost:8082',
		changeOrigin: true,
		rewrite: (path) => path.replace(/^\/api/, '/api/v1')
	},
	'/upload': {
		target: 'http://localhost:8082',
		changeOrigin: true,
		rewrite: (path) => path.replace(/^\/upload/, '/upload')
	}
};
