import type { Plugin } from "vite";
import { createEps } from "./eps";
import { config } from "./config";

export function base(): Plugin {
	return {
		name: "vite-btc-base",
		enforce: "pre",
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				// 处理 EPS 请求
				if (req.url?.includes("/admin/base/open/eps")) {
					try {
						const eps = await createEps();
						res.setHeader("Content-Type", "application/json");
						res.end(JSON.stringify({
							code: 1000,
							data: eps.list
						}));
						return;
					} catch (error) {
						res.statusCode = 500;
						res.end(JSON.stringify({
							code: 500,
							message: "EPS service error"
						}));
						return;
					}
				}
				next();
			});
		}
	};
}