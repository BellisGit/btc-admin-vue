import { createI18n } from 'vue-i18n';
import { config } from '/@/config';

// 导入语言包
import zhCN from '/$/base/locales/zh-cn.json';
import en from '/$/base/locales/en.json';

// 创建 i18n 实例
export const i18n = createI18n({
	legacy: false, // 使用 Composition API 模式
	locale: config.i18n?.locale || 'zh-cn',
	fallbackLocale: 'en',
	messages: {
		'zh-cn': zhCN,
		en: en
	},
	globalInjection: true // 全局注入 $t 函数
});

export default i18n;
