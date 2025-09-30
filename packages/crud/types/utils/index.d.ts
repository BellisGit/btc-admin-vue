export declare function isObject(val: any): boolean;
export declare function parsePx(val: string | number): string;
export declare function dataset(obj: any, key: string, value: any): any;
export declare function getValue(obj: any, path?: string, defaultValue?: any): any;
export declare function setValue(obj: any, path: string, value: any): void;
export declare function mergeConfig(options?: any): any;
/**
 * 深度合并对象
 * @param target 目标对象
 * @param sources 源对象数组
 * @returns 合并后的对象
 */
export declare function merge(target: any, ...sources: any[]): any;
/**
 * 深度克隆对象
 * @param value 要克隆的值
 * @returns 克隆后的值
 */
export declare function cloneDeep<T>(value: T): T;
/**
 * 检查值是否为空
 * @param value 要检查的值
 * @returns 是否为空
 */
export declare function isEmpty(value: any): boolean;
/**
 * 检查值是否为函数
 * @param value 要检查的值
 * @returns 是否为函数
 */
export declare function isFunction(value: any): value is Function;
/**
 * 检查值是否为对象
 * @param value 要检查的值
 * @returns 是否为对象
 */
export declare function isObjectType(value: any): value is object;
/**
 * 检查值是否为数组
 * @param value 要检查的值
 * @returns 是否为数组
 */
export declare function isArray(value: any): value is any[];
/**
 * 检查值是否为字符串
 * @param value 要检查的值
 * @returns 是否为字符串
 */
export declare function isString(value: any): value is string;
/**
 * 检查值是否为数字
 * @param value 要检查的值
 * @returns 是否为数字
 */
export declare function isNumberType(value: any): value is number;
/**
 * 检查值是否为布尔值
 * @param value 要检查的值
 * @returns 是否为布尔值
 */
export declare function isBoolean(value: any): value is boolean;
/**
 * 检查值是否为 undefined
 * @param value 要检查的值
 * @returns 是否为 undefined
 */
export declare function isUndefined(value: any): value is undefined;
/**
 * 检查值是否为 null
 * @param value 要检查的值
 * @returns 是否为 null
 */
export declare function isNull(value: any): value is null;
/**
 * 检查值是否为日期
 * @param value 要检查的值
 * @returns 是否为日期
 */
export declare function isDate(value: any): value is Date;
/**
 * 检查值是否为正则表达式
 * @param value 要检查的值
 * @returns 是否为正则表达式
 */
export declare function isRegExp(value: any): value is RegExp;
/**
 * 检查值是否为错误对象
 * @param value 要检查的值
 * @returns 是否为错误对象
 */
export declare function isError(value: any): value is Error;
/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写的字符串
 */
export declare function capitalize(str: string): string;
/**
 * 转换为驼峰命名
 * @param str 字符串
 * @returns 驼峰命名的字符串
 */
export declare function camelCase(str: string): string;
/**
 * 转换为短横线命名
 * @param str 字符串
 * @returns 短横线命名的字符串
 */
export declare function kebabCase(str: string): string;
/**
 * 转换为下划线命名
 * @param str 字符串
 * @returns 下划线命名的字符串
 */
export declare function snakeCase(str: string): string;
/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写的字符串
 */
export declare function upperFirst(str: string): string;
/**
 * 首字母小写
 * @param str 字符串
 * @returns 首字母小写的字符串
 */
export declare function lowerFirst(str: string): string;
/**
 * 截断字符串
 * @param str 字符串
 * @param options 选项
 * @returns 截断后的字符串
 */
export declare function truncate(str: string, options?: any): string;
/**
 * 转义 HTML 字符
 * @param str 字符串
 * @returns 转义后的字符串
 */
export declare function escape(str: string): string;
/**
 * 反转义 HTML 字符
 * @param str 字符串
 * @returns 反转义后的字符串
 */
export declare function unescape(str: string): string;
export * from './mitt';
export * from './global';
export * from './vnode';
export * from './form-hook';
export * from './parse';
