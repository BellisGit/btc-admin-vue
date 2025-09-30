import type { Plugin } from "vite";
import { createEps } from "./eps";
import { createCtx } from "./ctx";
import { createSvg } from "./svg";

export function virtual(): Plugin {
	const virtualModuleIds: string[] = [
		"virtual:eps",
		"virtual:ctx",
		"virtual:svg-register",
		"virtual:svg-icons",
	];

	createEps();

	return {
		name: "vite-btc-virtual",
		enforce: "pre",
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				// 页面刷新时触发
				if (req.url == "/@vite/client") {
					// 重新加载虚拟模块
					virtualModuleIds.forEach((vm) => {
						const mod = server.moduleGraph.getModuleById(`\0${vm}`);

						if (mod) {
							server.moduleGraph.invalidateModule(mod);
						}
					});
				}

				next();
			});
		},
		handleHotUpdate({ file, server }) {
			// 文件修改时触发
			if (
				!["pages.json", "dist", "build/btc", "eps.json", "eps.d.ts"].some((e) =>
					file.includes(e),
				)
			) {
				createCtx();
				createEps().then((data) => {
					if (data.isUpdate) {
						// 通知客户端刷新
						(server.hot || server.ws).send({
							type: "custom",
							event: "eps-update",
							data,
						});
					}
				});
			}
		},
		resolveId(id) {
			if (virtualModuleIds.includes(id)) {
				return "\0" + id;
			}
		},
		async load(id) {
			if (id === "\0virtual:eps") {
				const eps = await createEps();

				return `
					export const eps = ${JSON.stringify(eps)}
				`;
			}
			if (id === "\0virtual:ctx") {
				const ctx = await createCtx();

				return `
					export const ctx = ${JSON.stringify(ctx)}
				`;
			}

			if (id == "\0virtual:svg-register") {
				const { code } = await createSvg();
				return code;
			}

			if (id == "\0virtual:svg-icons") {
				const { svgIcons } = await createSvg();
				return `
					export const svgIcons = ${JSON.stringify(svgIcons)}
				`;
			}
		},
	};
}

// 虚拟模块生成函数
export function generateEpsModule(): string {
	return `// Auto-generated EPS virtual module
export interface EpsApi {
	name: string;
	path: string;
	method: string;
	summary?: string;
}

export const epsApis: EpsApi[] = [];
export const epsModules: any[] = [];
`;
}

export function generateCtxModule(): string {
	return `// Auto-generated context virtual module
export interface CtxData {
	serviceLang: "Node" | "Java" | "Go" | "Python";
	modules: string[];
	pages: any[];
	subPackages: any[];
}

export const ctx: CtxData = {
	serviceLang: "Node",
	modules: [],
	pages: [],
	subPackages: []
};
`;
}

export function generateSvgModule(): string {
	return `// Auto-generated SVG virtual module
export const svgIcons: Record<string, string> = {};
export const svgModules: Record<string, any> = {};
`;
}
