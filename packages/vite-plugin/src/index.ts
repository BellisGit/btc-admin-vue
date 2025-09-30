import type { Plugin } from "vite";
import type { Config } from "../types";
import { base } from "./base";
import { demo } from "./demo";
import { createSvgPlugin } from "./svg";
import { virtual } from "./virtual";
import { createUniAppXPlugin } from "./uniapp-x";
import { config } from "./config";

export function btc(options: Config.Options): Plugin[] {
	const {
		type = "admin",
		proxy,
		eps = {},
		demo: demoMode = false,
		nameTag = true,
		svg = {},
		tailwind = {},
		clean = false,
	} = options;

	// 更新配置
	config.type = type;
	config.demo = demoMode;
	config.nameTag = nameTag;
	config.svg = { ...config.svg, ...svg };
	config.tailwind = { ...config.tailwind, ...tailwind };
	config.clean = clean;

	// 设置代理目标URL
	if (proxy) {
		config.reqUrl = getProxyTarget(proxy);
	}

	// 更新EPS配置
	if (eps) {
		Object.assign(config.eps, eps);
	}

	const plugins: Plugin[] = [
		base(),
		demo(demoMode),
		createSvgPlugin(config.svg),
		virtual(),
	];

	// 如果是 uniapp-x 类型，添加特殊处理
	if (type === "uniapp-x") {
		plugins.push(createUniAppXPlugin());
	}

	return plugins;
}

function getProxyTarget(proxy: any): string {
	if (!proxy) return "";
	
	if (typeof proxy === "string") {
		return proxy;
	}
	
	if (typeof proxy === "object") {
		const keys = Object.keys(proxy);
		if (keys.length > 0) {
			const firstKey = keys[0];
			const firstProxy = proxy[firstKey];
			
			if (typeof firstProxy === "object" && firstProxy.target) {
				return firstProxy.target;
			}
		}
	}
	
	return "";
}

export default btc;
