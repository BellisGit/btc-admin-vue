import { isRef, mergeProps, toValue } from "vue";
import { assign, flatMap, isArray as lodashIsArray, isFunction as lodashIsFunction, isNumber as lodashIsNumber, mergeWith, cloneDeep as lodashCloneDeep, merge as lodashMerge, get, set, isEmpty as lodashIsEmpty, isObject as lodashIsObject, isString as lodashIsString, isBoolean as lodashIsBoolean, isUndefined as lodashIsUndefined, isNull as lodashIsNull, isDate as lodashIsDate, isRegExp as lodashIsRegExp, isError as lodashIsError, capitalize as lodashCapitalize, camelCase as lodashCamelCase, kebabCase as lodashKebabCase, snakeCase as lodashSnakeCase, upperFirst as lodashUpperFirst, lowerFirst as lodashLowerFirst, truncate as lodashTruncate, escape as lodashEscape, unescape as lodashUnescape } from 'lodash-es';

// 是否对象
export function isObject(val: any) {
	return val !== null && typeof val === "object";
}

// 解析px
export function parsePx(val: string | number) {
	return lodashIsNumber(val) ? `${val}px` : val;
}

// 数据设置
export function dataset(obj: any, key: string, value: any): any {
	const isGet = value === undefined;
	let d = obj;

	const arr = flatMap(
		key.split(".").map((e) => {
			if (e.includes("[")) {
				return e.split("[").map((e) => e.replace(/"/g, ""));
			} else {
				return e;
			}
		})
	);

	try {
		for (let i = 0; i < arr.length; i++) {
			const e: any = arr[i];
			let n: any = null;

			if (e.includes("]")) {
				const [k, v] = e.replace("]", "").split(":");

				if (v) {
					n = d.findIndex((x: any) => x[k] == v);
				} else {
					n = Number(k);
				}
			} else {
				n = e;
			}

			if (i != arr.length - 1) {
				d = d[n];
			} else {
				if (isGet) {
					return d[n];
				} else {
					d[n] = value;
				}
			}
		}
	} catch (e) {
		console.warn(`dataset error: ${key}`, e);
	}

	return isGet ? undefined : obj;
}

// 获取值
export function getValue(obj: any, path?: string, defaultValue?: any): any {
	if (!path) return obj;
	return get(obj, path, defaultValue);
}

// 设置值
export function setValue(obj: any, path: string, value: any): void {
	set(obj, path, value);
}

// 合并配置
export function mergeConfig(options: any = {}) {
	return {
		// 刷新前处理
		beforeRefresh: null,
		// 刷新后处理
		afterRefresh: null,
		// 新增前处理
		beforeAdd: null,
		// 新增后处理
		afterAdd: null,
		// 编辑前处理
		beforeUpdate: null,
		// 编辑后处理
		afterUpdate: null,
		// 删除前处理
		beforeDelete: null,
		// 删除后处理
		afterDelete: null,
		...options
	};
}

/**
 * 深度合并对象
 * @param target 目标对象
 * @param sources 源对象数组
 * @returns 合并后的对象
 */
export function merge(target: any, ...sources: any[]): any {
	return lodashMerge(target, ...sources);
}

/**
 * 深度克隆对象
 * @param value 要克隆的值
 * @returns 克隆后的值
 */
export function cloneDeep<T>(value: T): T {
	return lodashCloneDeep(value);
}

/**
 * 检查值是否为空
 * @param value 要检查的值
 * @returns 是否为空
 */
export function isEmpty(value: any): boolean {
	return lodashIsEmpty(value);
}

/**
 * 检查值是否为函数
 * @param value 要检查的值
 * @returns 是否为函数
 */
export function isFunction(value: any): value is Function {
	return lodashIsFunction(value);
}

/**
 * 检查值是否为对象
 * @param value 要检查的值
 * @returns 是否为对象
 */
export function isObjectType(value: any): value is object {
	return lodashIsObject(value);
}

/**
 * 检查值是否为数组
 * @param value 要检查的值
 * @returns 是否为数组
 */
export function isArray(value: any): value is any[] {
	return lodashIsArray(value);
}

/**
 * 检查值是否为字符串
 * @param value 要检查的值
 * @returns 是否为字符串
 */
export function isString(value: any): value is string {
	return lodashIsString(value);
}

/**
 * 检查值是否为数字
 * @param value 要检查的值
 * @returns 是否为数字
 */
export function isNumberType(value: any): value is number {
	return lodashIsNumber(value);
}

/**
 * 检查值是否为布尔值
 * @param value 要检查的值
 * @returns 是否为布尔值
 */
export function isBoolean(value: any): value is boolean {
	return lodashIsBoolean(value);
}

/**
 * 检查值是否为 undefined
 * @param value 要检查的值
 * @returns 是否为 undefined
 */
export function isUndefined(value: any): value is undefined {
	return lodashIsUndefined(value);
}

/**
 * 检查值是否为 null
 * @param value 要检查的值
 * @returns 是否为 null
 */
export function isNull(value: any): value is null {
	return lodashIsNull(value);
}

/**
 * 检查值是否为日期
 * @param value 要检查的值
 * @returns 是否为日期
 */
export function isDate(value: any): value is Date {
	return lodashIsDate(value);
}

/**
 * 检查值是否为正则表达式
 * @param value 要检查的值
 * @returns 是否为正则表达式
 */
export function isRegExp(value: any): value is RegExp {
	return lodashIsRegExp(value);
}

/**
 * 检查值是否为错误对象
 * @param value 要检查的值
 * @returns 是否为错误对象
 */
export function isError(value: any): value is Error {
	return lodashIsError(value);
}

/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写的字符串
 */
export function capitalize(str: string): string {
	return lodashCapitalize(str);
}

/**
 * 转换为驼峰命名
 * @param str 字符串
 * @returns 驼峰命名的字符串
 */
export function camelCase(str: string): string {
	return lodashCamelCase(str);
}

/**
 * 转换为短横线命名
 * @param str 字符串
 * @returns 短横线命名的字符串
 */
export function kebabCase(str: string): string {
	return lodashKebabCase(str);
}

/**
 * 转换为下划线命名
 * @param str 字符串
 * @returns 下划线命名的字符串
 */
export function snakeCase(str: string): string {
	return lodashSnakeCase(str);
}

/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写的字符串
 */
export function upperFirst(str: string): string {
	return lodashUpperFirst(str);
}

/**
 * 首字母小写
 * @param str 字符串
 * @returns 首字母小写的字符串
 */
export function lowerFirst(str: string): string {
	return lodashLowerFirst(str);
}

/**
 * 截断字符串
 * @param str 字符串
 * @param options 选项
 * @returns 截断后的字符串
 */
export function truncate(str: string, options?: any): string {
	return lodashTruncate(str, options);
}

/**
 * 转义 HTML 字符
 * @param str 字符串
 * @returns 转义后的字符串
 */
export function escape(str: string): string {
	return lodashEscape(str);
}

/**
 * 反转义 HTML 字符
 * @param str 字符串
 * @returns 反转义后的字符串
 */
export function unescape(str: string): string {
	return lodashUnescape(str);
}

// 导出其他工具模块
export * from './mitt';
export * from './global';
export * from './vnode';
export * from './form-hook';
export * from './parse';