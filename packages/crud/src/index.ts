import type { App } from 'vue';

// 导出所有组件
export * from './components';

// 导出所有 hooks
export * from './hooks';

// 导出工具函数
export * from './utils';

// 导出类型定义
// export * from './types'; // 暂时注释，等类型文件完善后再启用

// 导出国际化
export * from './locale';

// 导出测试服务
export * from './test/service';

// 主插件安装函数
export function install(app: App, options?: any) {
	// 注册全局组件
	// 注意：这里需要在组件实现后再完善
	
	// 注册全局属性
	app.config.globalProperties.$btcCrud = {
		version: '1.0.0',
		...options
	};

	// 提供全局配置
	app.provide('btc-crud-config', options);

	return {
		name: '@btc-vue/crud'
	};
}

// 默认导出
export default {
	install
};
