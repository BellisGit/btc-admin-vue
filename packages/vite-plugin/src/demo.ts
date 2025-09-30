import type { Plugin } from "vite";

export function demo(enable: boolean): Plugin {
	return {
		name: "vite-btc-demo",
		enforce: "pre",
		configureServer(server) {
			if (enable) {
				server.middlewares.use(async (req, res, next) => {
					// 演示模式处理
					if (req.url?.includes("/demo")) {
						res.setHeader("Content-Type", "application/json");
						res.end(JSON.stringify({
							code: 1000,
							message: "Demo mode enabled"
						}));
						return;
					}
					next();
				});
			}
		}
	};
}