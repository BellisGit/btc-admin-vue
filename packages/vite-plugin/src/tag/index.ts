import MagicString from "magic-string";
import { basename, dirname } from "path";

export function createTag(code: string, id: string): { code: string; map?: any } {
	const s = new MagicString(code);
	const filename = basename(id);
	const dir = dirname(id).split('/').pop() || '';
	
	const tag = `/* btc-file: ${dir}/${filename} */`;
	
	if (code.trim()) {
		s.prepend(tag + '\n');
	}
	
	return {
		code: s.toString(),
		map: s.generateMap({ source: id, includeContent: true })
	};
}
