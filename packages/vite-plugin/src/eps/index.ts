import { createDir, error, readFile, rootDir, toCamel } from "../utils";
import { join } from "path";
import axios from "axios";
import _ from "lodash";
import { createWriteStream } from "fs";
import prettier from "prettier";
import { config } from "../config";
// 临时类型定义
interface EpsEntity {
	prefix: string;
	name: string;
	namespace: string;
	api: any[];
	columns: any[];
	pageColumns: any[];
	search: {
		fieldEq: any[];
		fieldLike: any[];
		keyWordLikeFields: any[];
	};
	pageQueryOp?: {
		fieldEq: string[];
		fieldLike: string[];
		keyWordLikeFields: string[];
	};
}

// 全局 service 对象，用于存储服务结构
const service = {};
// eps 实体列表
let list: EpsEntity[] = [];

/**
 * 获取 eps 请求地址
 * @returns {string} eps url
 */
function getEpsUrl(): string {
	let url = config.eps.api;

	if (!url) {
		url = config.type;
	}

	switch (url) {
		case "app":
		case "uniapp-x":
			url = "/app/base/comm/eps";
			break;
		case "admin":
			url = "/admin/base/open/eps";
			break;
	}

	return url;
}

/**
 * 获取 eps 路径
 * @param filename 文件名
 * @returns {string} 完整路径
 */
function getEpsPath(filename?: string): string {
	return join(
		config.type == "admin" ? config.eps.dist : rootDir(config.eps.dist),
		filename || "",
	);
}

/**
 * 获取对象方法名（排除 namespace、permission 字段）
 * @param v 对象
 * @returns {string[]} 方法名数组
 */
function getNames(v: any): string[] {
	return Object.keys(v).filter((e) => !["namespace", "permission"].includes(e));
}

/**
 * 获取字段类型
 */
function getType({ type }: any) {
	for (const map of config.eps.mapping) {
		if (map.test) {
			if (map.test.includes(type)) return map.type;
		}
	}
	return type;
}

/**
 * 格式化方法名，去除特殊字符
 */
function formatName(name: string) {
	return (name || "").replace(/[:,\s,\/,-]/g, "");
}

/**
 * 检查方法名是否合法（不包含特殊字符）
 */
function checkName(name: string) {
	return name && !["{", "}", ":"].some((e) => name.includes(e));
}

/**
 * 不支持 uniapp-x 平台显示
 */
function noUniappX(text: string, defaultText: string = "") {
	if (config.type == "uniapp-x") {
		return defaultText;
	} else {
		return text;
	}
}

/**
 * 查找字段
 * @param sources 字段 source 数组
 * @param item eps 实体
 * @returns {Eps.Column[]} 字段数组
 */
function findColumns(sources: string[], item: EpsEntity): any[] {
	const columns = [item.columns, item.pageColumns].flat().filter(Boolean);
	return (sources || [])
		.map((e) => columns.find((c) => c.source == e))
		.filter(Boolean) as any[];
}

/**
 * 使用 prettier 格式化 TypeScript 代码
 * @param text 代码文本
 * @returns {Promise<string|null>} 格式化后的代码
 */
async function formatCode(text: string): Promise<string | null> {
	return prettier
		.format(text, {
			parser: "typescript",
			useTabs: true,
			tabWidth: 4,
			endOfLine: "lf",
			semi: true,
			singleQuote: false,
			printWidth: 100,
			trailingComma: "none",
		})
		.catch((err) => {
			console.log(err);
			error(`[btc-eps] File format error, please try again`);
			return null;
		});
}

/**
 * 获取 eps 数据（本地优先，远程兜底）
 */
async function getData() {
	// 读取本地 eps.json
	list = readFile(getEpsPath("eps.json"), true) || [];

	// 拼接请求地址
	const url = config.reqUrl + getEpsUrl();

	// 请求远程 eps 数据
	await axios
		.get(url, {
			timeout: 5000,
		})
		.then((res) => {
			const { code, data, message } = res.data;
			if (code === 1000) {
				if (!_.isEmpty(data) && data) {
					list = _.values(data).flat();
				}
			} else {
				error(`[btc-eps] ${message || "Failed to fetch data"}`);
			}
		})
		.catch(() => {
			error(`[btc-eps] API service is not running → ${url}`);
		});

	// 初始化处理，补全缺省字段
	if (Array.isArray(list)) {
		list.forEach((e) => {
			if (!e.namespace) e.namespace = "";
			if (!e.api) e.api = [];
			if (!e.columns) e.columns = [];
			if (!e.search) {
				e.search = {
					fieldEq: findColumns(e.pageQueryOp?.fieldEq || [], e),
					fieldLike: findColumns(e.pageQueryOp?.fieldLike || [], e),
					keyWordLikeFields: findColumns(e.pageQueryOp?.keyWordLikeFields || [], e),
				};
			}
		});
	}

	if (config.type == "uniapp-x" || config.type == "app") {
		if (Array.isArray(list)) {
			list = list.filter((e) => e.prefix.startsWith("/app") || e.prefix.startsWith("/admin"));
		}
	}
}

/**
 * 创建 eps.json 文件
 * @returns {boolean} 是否有更新
 */
function createJson(): boolean {
	let data: any[] = [];

	if (Array.isArray(list)) {
		if (config.type != "uniapp-x") {
			data = list.map((e) => {
				return {
					prefix: e.prefix,
					name: e.name || "",
					api: e.api.map((apiItem) => ({
						name: apiItem.name,
						method: apiItem.method,
						path: apiItem.path,
					})),
					search: e.search,
				};
			});
		} else {
			data = list;
		}
	}

	const content = JSON.stringify(data);
	const local_content = readFile(getEpsPath("eps.json"));

	// 判断是否需要更新
	const isUpdate = content != local_content;

	if (isUpdate) {
		createWriteStream(getEpsPath("eps.json"), {
			flags: "w",
		}).write(content);
	}

	return isUpdate;
}

/**
 * 构建 service 对象树
 */
function createService() {
	// 路径第一层作为 id 标识
	const id = getEpsUrl().split("/")[1];

	if (Array.isArray(list)) {
		list.forEach((e) => {
		// 请求地址
		const path = e.prefix[0] == "/" ? e.prefix.substring(1, e.prefix.length) : e.prefix;

		// 分隔路径，去除 id，转驼峰
		const arr = path.replace(id, "").split("/").filter(Boolean).map(toCamel);

		/**
		 * 递归构建 service 树
		 * @param d 当前节点
		 * @param i 当前索引
		 */
		function deep(d: any, i: number) {
			const k = arr[i];

			if (k) {
				// 是否最后一个
				if (arr[i + 1]) {
					if (!d[k]) {
						d[k] = {};
					}
					deep(d[k], i + 1);
				} else {
					// 不存在则创建
					if (!d[k]) {
						d[k] = {
							permission: {},
						};
					}

					if (!d[k].namespace) {
						d[k].namespace = path;
					}

					// 创建权限
					if (d[k].namespace) {
						getNames(d[k]).forEach((i) => {
							d[k].permission[i] =
								`${d[k].namespace.replace(`${id}/`, "")}/${i}`.replace(/\//g, ":");
						});
					}

					// 创建搜索
					d[k].search = e.search;

					// 创建方法
					e.api.forEach((a) => {
						// 方法名
						const n = a.path.replace("/", "");
						if (n && !/[-:]/g.test(n)) {
							d[k][n] = a;
						}
					});
				}
			}
		}

		deep(service, 0);
		});
	}
}

/**
 * 主入口：创建 eps 相关文件和 service
 */
export async function createEps() {
	if (config.eps.enable) {
		// 获取 eps 数据
		await getData();

		// 构建 service 对象
		createService();

		// 创建 eps 目录
		createDir(getEpsPath(), true);

		// 创建 eps.json 文件
		const isUpdate = createJson();

		return {
			service,
			list,
			isUpdate,
		};
	} else {
		return {
			service: {},
			list: [],
			isUpdate: false,
		};
	}
}