import { assign } from "lodash-es";
import { watch, ref, nextTick, getCurrentInstance, type Ref, inject, provide } from "vue";

// 获取上级
function useParent(name: string, r: Ref) {
	const d = getCurrentInstance();

	if (d) {
		let parent = d.proxy?.$.parent;

		if (parent) {
			while (parent && parent.type?.name != name && parent.type?.name != "btc-crud") {
				parent = parent?.parent;
			}

			if (parent) {
				if (parent.type.name == name) {
					r.value = parent.exposed;
				}
			}
		}
	}
}

// 多事件
function useEvent(
	names: string[],
	{ r, options, clear, isChild }: { r: any; options: any; clear?: string; isChild?: boolean }
) {
	if (!r.__ev) r.__ev = {};

	const d: { [key: string]: (args: any[]) => void } = {};
	const ev = r.__ev as { [key: string]: { fn: any; isChild?: boolean }[] };

	names.forEach((k) => {
		if (!ev[k]) ev[k] = [];

		if (options[k]) {
			ev[k].push({
				fn: options[k],
				isChild
			});
		}

		d[k] = (...args: any[]) => {
			ev[k].forEach((e) => {
				if (e.fn) {
					e.fn(...args);
				}
			});

			if (clear == k) {
				for (const i in ev) {
					ev[i] = ev[i].filter((e) => !e.isChild);
				}
			}
		};
	});

	return d;
}

// crud
export function useCrud(options?: any, cb?: (app: any) => void) {
	const Crud = ref<any>();
	useParent("btc-crud", Crud);

	if (options) {
		// 测试模式
		if (options.service == "test") {
			// 动态导入 TestService
			import("../test/service").then((module) => {
				options.service = module.testService;
			});
		}

		provide("useCrud__options", options);
	}

	watch(Crud, (val) => {
		if (val) {
			if (cb) {
				cb(val);
			}
		}
	});

	return Crud;
}

// 新增、编辑
export function useUpsert<T = any>(options?: any) {
	const Upsert = ref<any>();
	useParent("btc-upsert", Upsert);
	const isChild = !!Upsert.value;

	if (options) {
		provide("useUpsert__options", options);
	}

	watch(
		Upsert,
		(val) => {
			if (val) {
				if (options) {
					const event = useEvent(["onOpen", "onOpened", "onClosed"], {
						r: val,
						options,
						clear: "onClosed",
						isChild
					});

					assign(val.config, event);
				}
			}
		},
		{
			immediate: true
		}
	);

	return Upsert;
}

// 表格
export function useTable<T = any>(options?: any, cb?: (table: any) => void) {
	const Table = ref<any>();
	useParent("btc-table", Table);

	if (options) {
		provide("useTable__options", options);
	}

	watch(Table, (val) => {
		if (val) {
			if (cb) {
				cb(val);
			}
		}
	});

	return Table;
}

// 表单
export function useForm<T = any>(cb?: (app: any) => void) {
	const Form = ref<any>();
	useParent("btc-form", Form);

	nextTick(() => {
		if (cb && Form.value) {
			cb(Form.value);
		}
	});

	return Form;
}

// 高级搜索
export function useAdvSearch<T = any>(options?: any) {
	const AdvSearch = ref<any>();
	useParent("btc-adv-search", AdvSearch);

	if (options) {
		provide("useAdvSearch__options", options);
	}

	return AdvSearch;
}

// 搜索
export function useSearch<T = any>(options?: any) {
	const Search = ref<any>();
	useParent("btc-search", Search);

	provide("useSearch__options", options);

	return Search;
}

// 对话框
export function useDialog(options?: { onFullscreen(visible: boolean): void }) {
	const Dialog = inject("dialog") as any;

	watch(
		() => Dialog?.fullscreen.value,
		(val) => {
			options?.onFullscreen(val);
		}
	);

	return Dialog;
}