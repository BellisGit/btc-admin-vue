import { type ModuleConfig } from '/@/btc';
import { config } from '/@/config';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';

export default (): ModuleConfig => {
	const lang = {
		'zh-cn': zhCn,
		en
	};

	return {
		order: 100,
		install(app) {
			app.use(ElementPlus, {
				locale: lang[config.i18n.locale],
				size: 'default'
			});

			// 禁用 Element Plus 的 debugWarn 函数
			// 这会完全消除开发环境下的 Element Plus 表单验证警告
			if (typeof window !== 'undefined') {
				const originalConsoleWarn = console.warn;
				console.warn = (...args: any[]) => {
					const message = args[0];
					
					// 过滤 Element Plus 的表单验证调试信息
					// 这些信息通常是纯对象，包含字段名和错误数组
					if (message && typeof message === 'object') {
						// 检查是否所有值都是数组（表单验证错误格式）
						const values = Object.values(message);
						const isFormValidationError = values.every(
							v => Array.isArray(v) && v.length > 0 && v[0]?.message
						);
						
						if (isFormValidationError) {
							// 这是表单验证错误信息，忽略
							return;
						}
					}
					
					// 保留其他警告
					originalConsoleWarn.apply(console, args);
				};
			}

			// 在生产环境禁用所有警告
			if (import.meta.env.PROD) {
				app.config.warnHandler = () => null;
			}
		},

		label: 'Element UI',
		description: 'Element Plus 变量、样式配置',
		author: 'BTC-SaaS',
		version: '1.0.0',
		updateTime: '2024-12-29',
		doc: 'https://element-plus.org/zh-CN/component/overview.html'
	};
};
