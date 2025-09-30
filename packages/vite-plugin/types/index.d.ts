export namespace Config {
	export interface Options {
		type?: "admin" | "app" | "uniapp-x";
		proxy?: any;
		eps?: {
			enable?: boolean;
			api?: string;
			dist?: string;
			mapping?: any[];
		};
		demo?: boolean;
		nameTag?: boolean;
		svg?: {
			enable?: boolean;
			skipNames?: string[];
		};
		tailwind?: any;
		clean?: boolean;
	}
}