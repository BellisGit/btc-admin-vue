import type { Plugin } from "vite";
import { createSvg } from "./svg/index";

export { createSvg };

export function createSvgPlugin(options: any): Plugin {
	return {
		name: "vite-btc-svg",
		enforce: "pre",
		async buildStart() {
			if (options.enable) {
				await createSvg();
			}
		}
	};
}
