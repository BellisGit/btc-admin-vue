import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function rootDir(...paths: string[]): string {
	return join(__dirname, "../../../", ...paths);
}

export function readFile(path: string, isJson = false): any {
	if (!existsSync(path)) {
		return isJson ? {} : "";
	}
	
	const content = readFileSync(path, "utf-8");
	return isJson ? JSON.parse(content) : content;
}

export function writeFile(path: string, content: string): void {
	const dir = dirname(path);
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}
	writeFileSync(path, content, "utf-8");
}

export function createDir(path: string, recursive = false): void {
	if (!existsSync(path)) {
		mkdirSync(path, { recursive });
	}
}

export function error(message: string): void {
	console.error(message);
}

export function firstUpperCase(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toCamel(str: string): string {
	return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

export function filename(path: string): string {
	return path.split("/").pop()?.split(".")[0] || "";
}
