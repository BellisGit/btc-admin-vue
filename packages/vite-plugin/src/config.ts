export const config = {
	type: "admin",
	reqUrl: "http://localhost:8001",
	demo: false,
	nameTag: true,
	clean: false,
	eps: {
		enable: true,
		api: "/admin/base/open/eps",
		dist: "./src/eps",
		mapping: [
			{
				test: ["varchar", "char", "text", "longtext"],
				type: "string",
				custom: undefined
			},
			{
				test: ["int", "bigint", "tinyint", "smallint"],
				type: "number",
				custom: undefined
			},
			{
				test: ["decimal", "float", "double"],
				type: "number",
				custom: undefined
			},
			{
				test: ["date", "datetime", "timestamp"],
				type: "Date",
				custom: undefined
			},
			{
				test: ["json"],
				type: "any",
				custom: undefined
			}
		]
	},
	svg: {
		enable: true,
		skipNames: ["base", "theme"]
	},
	tailwind: {}
};