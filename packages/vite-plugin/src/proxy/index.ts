export function getProxyTarget(proxy: any): string {
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

export async function updateProxy(body: any): Promise<void> {
	console.log("[btc-vite-plugin] Update proxy:", body);
}
