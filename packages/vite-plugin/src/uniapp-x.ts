import type { Plugin } from "vite";

export function createUniAppXPlugin(): Plugin {
	return {
		name: "vite-btc-uniapp-x",
		enforce: "pre",
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				// UniApp-X 特殊处理
				if (req.url?.includes("/uniapp-x")) {
					res.setHeader("Content-Type", "application/json");
					res.end(JSON.stringify({
						code: 1000,
						message: "UniApp-X mode enabled"
					}));
					return;
				}
				next();
			});
		}
	};
}
