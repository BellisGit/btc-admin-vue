/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module '@btc-vue/crud' {
	export * from '@btc-vue/crud/dist';
}

declare module '@btc-vue/vite-plugin' {
	export * from '@btc-vue/vite-plugin/dist';
}

// 环境变量类型定义
interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_APP_VERSION: string;
	readonly VITE_API_BASE_URL: string;
	readonly VITE_API_TIMEOUT: string;
	readonly VITE_UPLOAD_URL: string;
	readonly VITE_APP_ENV: 'development' | 'production' | 'demo';
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// 全局类型声明
declare global {
	namespace Btc {
		interface Module {
			name: string;
			options?: any;
			install?: () => void;
			onLoad?: () => Promise<any>;
		}

		interface Plugin {
			name: string;
			version: string;
			description?: string;
			install?: () => void;
			onLoad?: () => Promise<any>;
		}

		interface Service {
			request: any;
			[key: string]: any;
		}
	}
}

export {};
