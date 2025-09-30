import { writeFile, createDir, rootDir } from "../utils";

export async function createFile(data: any): Promise<void> {
	if (!data || !data.path || !data.content) {
		throw new Error("Invalid file data");
	}
	
	const filePath = rootDir(data.path);
	const dir = filePath.substring(0, filePath.lastIndexOf('/'));
	
	createDir(dir, true);
	writeFile(filePath, data.content);
	
	console.log(`[btc-vite-plugin] File created: ${data.path}`);
}
