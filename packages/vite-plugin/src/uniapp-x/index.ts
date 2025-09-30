export function createUniAppXPlugin(): any {
	return {
		name: "vite-btc-uniapp-x",
		transform(code: string, id: string) {
			if (id.includes("uniapp-x")) {
				return {
					code: `// UniApp-X support\n${code}`,
				};
			}
		},
	};
}
