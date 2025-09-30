declare module "virtual:btc-eps" {
	export interface EpsApi {
		name: string;
		path: string;
		method: string;
		summary?: string;
	}
	
	export const epsApis: EpsApi[];
	export const epsModules: any[];
}

declare module "virtual:btc-ctx" {
	export interface CtxData {
		serviceLang: "Node" | "Java" | "Go" | "Python";
		modules: string[];
		pages: any[];
		subPackages: any[];
	}
	
	export const ctx: CtxData;
}

declare module "virtual:btc-svg" {
	export const svgIcons: Record<string, string>;
	export const svgModules: Record<string, any>;
}
