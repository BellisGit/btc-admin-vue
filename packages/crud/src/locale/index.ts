/**
 * 国际化主入口文件
 * BTC CRUD 组件库国际化配置
 */

import zhCn from './zh-cn';
import en from './en';
import ja from './ja';
import zhTw from './zh-tw';

// 语言包映射
export const messages = {
	'zh-cn': zhCn,
	'en': en,
	'ja': ja,
	'zh-tw': zhTw
};

// 支持的语言列表
export const supportedLocales = Object.keys(messages);

// 默认语言
export const defaultLocale = 'zh-cn';

// 导出语言包
export { zhCn, en, ja, zhTw };

// 国际化工具函数
export class I18nUtils {
	private locale: string = defaultLocale;
	private fallbackLocale: string = 'en';
	private messages: Record<string, any> = messages;

	/**
	 * 获取当前语言
	 * @returns 当前语言代码
	 */
	getLocale(): string {
		return this.locale;
	}

	/**
	 * 设置语言
	 * @param locale 语言代码
	 */
	setLocale(locale: string): void {
		if (supportedLocales.includes(locale)) {
			this.locale = locale;
		} else {
			console.warn(`Unsupported locale: ${locale}`);
		}
	}

	/**
	 * 获取翻译文本
	 * @param key 翻译键
	 * @param params 参数
	 * @returns 翻译后的文本
	 */
	t(key: string, params?: Record<string, any>): string {
		const keys = key.split('.');
		let value = this.messages[this.locale];

		// 遍历键路径
		for (const k of keys) {
			if (value && typeof value === 'object') {
				value = value[k];
			} else {
				// 如果当前语言找不到，尝试回退语言
				value = this.messages[this.fallbackLocale];
				for (const k2 of keys) {
					if (value && typeof value === 'object') {
						value = value[k2];
					} else {
						value = undefined;
						break;
					}
				}
				break;
			}
		}

		// 如果还是找不到，返回键本身
		if (value === undefined) {
			return key;
		}

		// 处理参数替换
		if (params && typeof value === 'string') {
			return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
				return params[paramKey] !== undefined ? String(params[paramKey]) : match;
			});
		}

		return value;
	}

	/**
	 * 检查键是否存在
	 * @param key 翻译键
	 * @returns 是否存在
	 */
	te(key: string): boolean {
		const keys = key.split('.');
		let value = this.messages[this.locale];

		for (const k of keys) {
			if (value && typeof value === 'object') {
				value = value[k];
			} else {
				return false;
			}
		}

		return value !== undefined;
	}

	/**
	 * 获取所有语言
	 * @returns 语言列表
	 */
	getLocales(): string[] {
		return supportedLocales;
	}

	/**
	 * 添加语言包
	 * @param locale 语言代码
	 * @param messages 语言包
	 */
	addLocale(locale: string, messages: any): void {
		this.messages[locale] = messages;
	}

	/**
	 * 移除语言包
	 * @param locale 语言代码
	 */
	removeLocale(locale: string): void {
		if (locale !== defaultLocale && locale !== this.fallbackLocale) {
			delete this.messages[locale];
		}
	}

	/**
	 * 格式化日期
	 * @param date 日期
	 * @param format 格式
	 * @returns 格式化后的日期字符串
	 */
	formatDate(date: Date | string | number, format?: string): string {
		const d = new Date(date);
		if (isNaN(d.getTime())) return '';

		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		};

		return d.toLocaleDateString(this.locale, options);
	}

	/**
	 * 格式化数字
	 * @param number 数字
	 * @param options 选项
	 * @returns 格式化后的数字字符串
	 */
	formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
		return number.toLocaleString(this.locale, options);
	}

	/**
	 * 格式化货币
	 * @param amount 金额
	 * @param currency 货币代码
	 * @returns 格式化后的货币字符串
	 */
	formatCurrency(amount: number, currency = 'CNY'): string {
		return amount.toLocaleString(this.locale, {
			style: 'currency',
			currency
		});
	}

	/**
	 * 格式化百分比
	 * @param value 值
	 * @param decimals 小数位数
	 * @returns 格式化后的百分比字符串
	 */
	formatPercentage(value: number, decimals = 2): string {
		return (value * 100).toFixed(decimals) + '%';
	}

	/**
	 * 格式化文件大小
	 * @param bytes 字节数
	 * @returns 格式化后的文件大小字符串
	 */
	formatFileSize(bytes: number): string {
		const units = ['B', 'KB', 'MB', 'GB', 'TB'];
		let size = bytes;
		let unitIndex = 0;

		while (size >= 1024 && unitIndex < units.length - 1) {
			size /= 1024;
			unitIndex++;
		}

		return `${size.toFixed(2)} ${units[unitIndex]}`;
	}

	/**
	 * 格式化相对时间
	 * @param date 日期
	 * @returns 格式化后的相对时间字符串
	 */
	formatRelativeTime(date: Date | string | number): string {
		const now = new Date();
		const d = new Date(date);
		const diff = now.getTime() - d.getTime();

		const minute = 60 * 1000;
		const hour = minute * 60;
		const day = hour * 24;
		const week = day * 7;
		const month = day * 30;
		const year = day * 365;

		if (diff < minute) {
			return this.t('time.justNow');
		} else if (diff < hour) {
			const minutes = Math.floor(diff / minute);
			return this.t('time.minutesAgo', { minutes });
		} else if (diff < day) {
			const hours = Math.floor(diff / hour);
			return this.t('time.hoursAgo', { hours });
		} else if (diff < week) {
			const days = Math.floor(diff / day);
			return this.t('time.daysAgo', { days });
		} else if (diff < month) {
			const weeks = Math.floor(diff / week);
			return this.t('time.weeksAgo', { weeks });
		} else if (diff < year) {
			const months = Math.floor(diff / month);
			return this.t('time.monthsAgo', { months });
		} else {
			const years = Math.floor(diff / year);
			return this.t('time.yearsAgo', { years });
		}
	}

	/**
	 * 获取时区
	 * @returns 时区字符串
	 */
	getTimezone(): string {
		return Intl.DateTimeFormat().resolvedOptions().timeZone;
	}

	/**
	 * 设置时区
	 * @param timezone 时区字符串
	 */
	setTimezone(timezone: string): void {
		// 这里可以实现时区设置逻辑
		console.log('Timezone set to:', timezone);
	}
}

// 创建全局国际化实例
export const i18n = new I18nUtils();

// 默认导出
export default i18n;
