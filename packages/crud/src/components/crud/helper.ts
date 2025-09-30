import { ElMessageBox, ElMessage } from "element-plus";
import { Mitt } from "../../utils/mitt";
import { ref } from "vue";
import { assign, isArray, isFunction } from "lodash-es";
import { merge } from "../../utils";

interface Options {
	mitt: Mitt;
	config: any;
	crud: any;
}

export function useHelper({ config, crud, mitt }: Options) {
	// 刷新随机值，避免脏数据
	const refreshRd = ref(0);

	// 获取权限
	function getPermission(key: "page" | "list" | "info" | "update" | "add" | "delete"): boolean {
		return Boolean(crud.permission[key]);
	}

	// 根据字典替换请求参数
	function paramsReplace(params: any) {
		const { pagination, search, sort } = crud.dict;

		// 请求参数
		const a: any = { ...params };

		// 字典
		const b: any = { ...pagination, ...search, ...sort };

		for (const i in b) {
			if (a[i]) {
				if (i != b[i]) {
					a[`_${b[i]}`] = a[i];

					delete a[i];
				}
			}
		}

		for (const i in a) {
			if (i[0] === "_") {
				a[i.substr(1)] = a[i];

				delete a[i];
			}
		}

		return a;
	}

	// 刷新数据
	async function refresh(params?: any) {
		if (!crud.service) {
			console.warn("service is not defined");
			return;
		}

		// 刷新随机值
		refreshRd.value++;

		// 请求参数
		const reqParams = {
			...crud.params,
			...params,
			_refresh: refreshRd.value
		};

		// 替换参数
		const a = paramsReplace(reqParams);

		// 请求前处理
		if (config.beforeRefresh) {
			const d = config.beforeRefresh(a);
			if (d) {
				Object.assign(a, d);
			}
		}

		// 开始请求
		crud.loading = true;

		try {
			// 请求数据
			const res = await crud.service.page(a);

			// 请求后处理
			if (config.afterRefresh) {
				const d = config.afterRefresh(res);
				if (d) {
					Object.assign(res, d);
				}
			}

			// 设置数据
			crud.data = res.list || [];
			crud.total = res.total || 0;
			crud.page = res.page || 1;
			crud.size = res.size || 20;

			// 发送事件
			mitt.emit("crud.refresh", res);
		} catch (error) {
			console.error("刷新数据失败:", error);
			ElMessage.error("刷新数据失败");
		} finally {
			crud.loading = false;
		}
	}

	// 新增
	async function add(row?: any) {
		if (!getPermission("add")) {
			ElMessage.warning("无权限");
			return;
		}

		crud.upsert = {
			visible: true,
			mode: "add",
			form: row || {}
		};

		mitt.emit("crud.add", row);
	}

	// 编辑
	async function edit(row: any) {
		if (!getPermission("update")) {
			ElMessage.warning("无权限");
			return;
		}

		crud.upsert = {
			visible: true,
			mode: "edit",
			form: { ...row }
		};

		mitt.emit("crud.edit", row);
	}

	// 删除
	async function del(row: any) {
		if (!getPermission("delete")) {
			ElMessage.warning("无权限");
			return;
		}

		try {
			await ElMessageBox.confirm("确定要删除这条数据吗？", "提示", {
				type: "warning"
			});

			// 请求前处理
			if (config.beforeDelete) {
				const d = config.beforeDelete([row.id]);
				if (d === false) return;
			}

			// 删除数据
			await crud.service.delete([row.id]);

			// 请求后处理
			if (config.afterDelete) {
				config.afterDelete([row.id]);
			}

			ElMessage.success("删除成功");
			await refresh();
			mitt.emit("crud.delete", row);
		} catch (error) {
			if (error !== "cancel") {
				console.error("删除失败:", error);
				ElMessage.error("删除失败");
			}
		}
	}

	// 查看
	async function view(row: any) {
		crud.upsert = {
			visible: true,
			mode: "view",
			form: { ...row }
		};

		mitt.emit("crud.view", row);
	}

	// 保存
	async function save() {
		if (!crud.upsert.form) {
			ElMessage.warning("表单数据为空");
			return;
		}

		const { mode, form } = crud.upsert;

		// 请求前处理
		if (mode === "add" && config.beforeAdd) {
			const d = config.beforeAdd(form);
			if (d === false) return;
			if (d) {
				Object.assign(form, d);
			}
		}

		if (mode === "edit" && config.beforeUpdate) {
			const d = config.beforeUpdate(form);
			if (d === false) return;
			if (d) {
				Object.assign(form, d);
			}
		}

		crud.formLoading = true;

		try {
			let res;

			if (mode === "add") {
				res = await crud.service.add(form);
			} else {
				res = await crud.service.update(form);
			}

			// 请求后处理
			if (mode === "add" && config.afterAdd) {
				config.afterAdd(res);
			}

			if (mode === "edit" && config.afterUpdate) {
				config.afterUpdate(res);
			}

			ElMessage.success("保存成功");
			crud.upsert.visible = false;
			await refresh();
			mitt.emit("crud.save", { mode, form, res });
		} catch (error) {
			console.error("保存失败:", error);
			ElMessage.error("保存失败");
		} finally {
			crud.formLoading = false;
		}
	}

	// 关闭
	function close() {
		crud.upsert = {
			visible: false,
			mode: "",
			form: {}
		};

		mitt.emit("crud.close");
	}

	// 重置搜索
	function resetSearch() {
		crud.search = {};
		crud.page = 1;
		refresh();
		mitt.emit("crud.resetSearch");
	}

	// 搜索提交
	function searchSubmit(params?: any) {
		crud.search = params || {};
		crud.page = 1;
		refresh();
		mitt.emit("crud.searchSubmit", params);
	}

	// 页码变化
	function pageChange(page: number) {
		crud.page = page;
		refresh();
		mitt.emit("crud.pageChange", page);
	}

	// 页大小变化
	function sizeChange(size: number) {
		crud.size = size;
		crud.page = 1;
		refresh();
		mitt.emit("crud.sizeChange", size);
	}

	// 选择变化
	function selectionChange(selection: any[]) {
		crud.selection = selection;
		mitt.emit("crud.selectionChange", selection);
	}

	// 批量删除
	async function batchDelete() {
		if (crud.selection.length === 0) {
			ElMessage.warning("请选择要删除的数据");
			return;
		}

		if (!getPermission("delete")) {
			ElMessage.warning("无权限");
			return;
		}

		try {
			await ElMessageBox.confirm(`确定要删除选中的 ${crud.selection.length} 条数据吗？`, "提示", {
				type: "warning"
			});

			const ids = crud.selection.map((item: any) => item.id);

			// 请求前处理
			if (config.beforeDelete) {
				const d = config.beforeDelete(ids);
				if (d === false) return;
			}

			// 删除数据
			await crud.service.delete(ids);

			// 请求后处理
			if (config.afterDelete) {
				config.afterDelete(ids);
			}

			ElMessage.success("删除成功");
			crud.selection = [];
			await refresh();
			mitt.emit("crud.batchDelete", ids);
		} catch (error) {
			if (error !== "cancel") {
				console.error("批量删除失败:", error);
				ElMessage.error("批量删除失败");
			}
		}
	}

	return {
		refresh,
		add,
		edit,
		del,
		view,
		save,
		close,
		resetSearch,
		searchSubmit,
		pageChange,
		sizeChange,
		selectionChange,
		batchDelete,
		getPermission,
		paramsReplace
	};
}
