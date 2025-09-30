import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
	input: "./src/index.ts",
	output: {
		file: "./dist/index.js",
		format: "es",
	},
	external: [
		"vite",
		"path",
		"fs",
		"@vue/compiler-sfc",
		"axios",
		"glob",
		"lodash",
		"magic-string",
		"prettier",
		"svgo",
		"postcss-value-parser"
	],
	plugins: [
		typescript({
			tsconfig: "./tsconfig.json",
			declaration: true,
			declarationDir: "./dist",
			exclude: ["**/*.test.ts", "**/*.spec.ts"]
		})
	],
});
