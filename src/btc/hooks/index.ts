import { getCurrentInstance, type Ref, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { service } from '../service';
import { getBrowser } from '../utils';

// HMR 数据存储
const hmrData = ref<Record<string, any>>({});

export const hmr = {
	// 获取数据
	getData(key: string, defaultValue?: any) {
		return hmrData.value[key] || defaultValue;
	},

	// 设置数据
	setData(key: string, value: any) {
		hmrData.value[key] = value;
	},

	// 清除数据
	clearData(key?: string) {
		if (key) {
			delete hmrData.value[key];
		} else {
			hmrData.value = {};
		}
	}
};

// 创建一个响应式的 refs 对象，并提供操作 refs 的方法
export function useRefs() {
	const refs = reactive<{ [key: string]: any }>({});

	// 操作 refs 的方法，返回一个函数，用于更新特定的 ref
	function setRefs(name: string) {
		return (el: any) => {
			refs[name] = el;
			return () => refs[name]; // 返回一个函数，用于获取当前 ref
		};
	}

	return { refs, setRefs };
}

// 获取指定名称的父组件实例，并将其暴露的属性赋值给指定的 Ref
export function useParent(name: string, r: Ref) {
	const instance = getCurrentInstance();

	if (instance) {
		let parent = instance.proxy?.$.parent;

		// 向上遍历父组件，直到找到匹配的组件
		while (parent && parent.type?.name !== name) {
			parent = parent?.parent;
		}

		// 如果找到匹配的父组件，将其暴露的属性赋值给 Ref
		if (parent && parent.type.name === name) {
			r.value = parent.exposed;
		}
	}

	return r;
}

// 组合多个模块，返回一个包含服务、路由、事件等功能的对象
export function useBtc() {
	return {
		service,
		route: useRoute(),
		router: useRouter(),
		browser: getBrowser(),
		...useRefs()
	};
}
