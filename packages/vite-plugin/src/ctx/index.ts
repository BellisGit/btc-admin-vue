import { join } from "path";
import { readFile, rootDir, writeFile, error } from "../utils";
import { glob } from "glob";
import _ from "lodash";
import { config } from "../config";
import fs from "fs";
import axios from "axios";
import util from "node:util";
// 临时类型定义
interface CtxData {
	serviceLang: "Node" | "Java" | "Go" | "Python";
	modules: string[];
	pages: any[];
	subPackages: any[];
	appid?: string;
}

export async function createCtx() {
	let ctx: CtxData = {
		serviceLang: "Node",
		modules: [],
		pages: [],
		subPackages: []
	};

	if (config.type == "app" || config.type == "uniapp-x") {
		const manifest = readFile(rootDir("manifest.json"), true);

		// 文件路径
		const ctxPath = rootDir("pages.json");

		// 页面配置
		ctx = readFile(ctxPath, true);

		// 原数据，做更新比较用
		const ctxData = _.cloneDeep(ctx);

		// 删除临时页面
		ctx.pages = ctx.pages?.filter((e) => !e.isTemp);
		ctx.subPackages = ctx.subPackages?.filter((e) => !e.isTemp);

		// 加载 uni_modules 配置文件
		const files = await glob(rootDir("uni_modules") + "/**/pages_init.json", {
			stat: true,
			withFileTypes: true,
		});

		for (const file of files) {
			if (file.isFile()) {
				const { pages = [], subPackages = [] }: CtxData = readFile(
					join(file.path, file.name),
					true,
				);

				// 合并到 pages 中
				[...pages, ...subPackages].forEach((e) => {
					e.isTemp = true;

					const isSub = !!e.root;

					const d = isSub
						? ctx.subPackages?.find((a) => a.root == e.root)
						: ctx.pages?.find((a) => a.path == e.path);

					if (d) {
						_.assign(d, e);
					} else {
						if (isSub) {
							ctx.subPackages?.unshift(e);
						} else {
							ctx.pages?.unshift(e);
						}
					}
				});
			}
		}

		// 排序后检测，避免加载顺序问题
		function order(d: CtxData) {
			return {
				pages: _.orderBy(d.pages, "path"),
				subPackages: _.orderBy(d.subPackages, "root"),
			};
		}

		// 是否需要更新 pages.json
		if (!util.isDeepStrictEqual(order(ctxData), order(ctx))) {
			console.log("[btc-ctx] pages updated");
			writeFile(ctxPath, JSON.stringify(ctx, null, 4));
		}

		// appid
		ctx.appid = manifest.appid;
	}

	if (config.type == "admin") {
		const list = fs.readdirSync(rootDir("./src/modules"));
		ctx.modules = list.filter((e) => !e.includes("."));

		await axios
			.get(config.reqUrl + "/admin/base/comm/program", {
				timeout: 5000,
			})
			.then((res) => {
				const { code, data, message } = res.data;

				if (code === 1000) {
					ctx.serviceLang = data || "Node";
				} else {
					error(`[btc-ctx] ${message}`);
				}
			})
			.catch((err) => {
				// console.error(['[btc-ctx] ', err.message])
			});
	}

	return ctx;
}