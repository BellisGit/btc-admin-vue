import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { module, storage } from '/@/btc';
import { useBase } from '/$/base';
import { useDark } from '@vueuse/core';
import { mix } from '../utils';
import { assign } from 'lodash-es';
import { config } from '/@/config';

export const useTheme = defineStore('theme', () => {
	const { app } = useBase();
	const isDark = useDark();
	const { options } = module.get('theme');

	// 当前主题
	const theme = reactive<Theme>(
		storage.get('theme') ||
			assign(
				{
					isGroup: config.app.menu.isGroup,
					transition: config.app.router.transition
				},
				options
			)
	);

	// 主题列表
	const themes = ref(options.list);

	// 主题色
	const color = computed(() => theme.color);

	// 设置主题
	function setTheme({ color, name, isGroup, transition, dark }: Theme) {
		// 设置暗黑模式
		if (dark !== undefined) {
			isDark.value = dark;
		}

		// 主题配置
		const theme = storage.get('theme') || {};

		// 变量前缀
		const pre = '--el-color-primary';

		// 白色混合色
		const mixWhite = '#ffffff';

		// 黑色混合色
		const mixBlack = '#131313';

		// 元素
		const el = document.documentElement;

		// 主题
		if (name) {
			const item = options.list.find(e => e.name == name);

			if (item) {
				if (!color) {
					color = item.color;
				}
				document.body?.setAttribute('class', `theme-${name}`);
			}

			theme.name = name;
		}

		// 设置主色
		if (color) {
			el.style.setProperty(pre, color);

			// 设置辅色
			for (let i = 1; i < 10; i += 1) {
				if (isDark.value) {
					el.style.setProperty(`${pre}-light-${i}`, mix(color, mixBlack, i * 0.1));
					el.style.setProperty(`${pre}-dark-${i}`, mix(color, mixWhite, i * 0.1));
				} else {
					el.style.setProperty(`${pre}-light-${i}`, mix(color, mixWhite, i * 0.1));
					el.style.setProperty(`${pre}-dark-${i}`, mix(color, mixBlack, i * 0.1));
				}
			}

			theme.color = color;
		}

		// 菜单分组显示
		if (isGroup !== undefined) {
			theme.isGroup = isGroup;
			app.set({
				menu: {
					isGroup
				}
			});
		}

		// 转场动画
		if (transition !== undefined) {
			theme.transition = transition;
			app.set({
				router: {
					transition
				}
			});
		}

		storage.set('theme', theme);
	}

	// 切换暗黑模式
	function changeDark(el: Element, isDark: boolean, cb: () => void) {
		// 防止并发触发（双击、极快切换）
		if ((document as any)._vtRunning) return;
		
		const doSwitch = async () => {
			// 执行主题切换回调
			cb();
			// 使用 Promise.resolve() 强制微任务，让布局更新
			await Promise.resolve();
		};

		// 检查浏览器是否支持 View Transition API
		if (!('startViewTransition' in document)) {
			return doSwitch(); // 兼容不支持的浏览器
		}

		(document as any)._vtRunning = true;
		// 使用 call 方法确保正确的 this 上下文
		const transition = (document as any).startViewTransition.call(document, doSwitch);
		transition.finished.finally(() => { 
			(document as any)._vtRunning = false; 
		});
	}

	// 初始化
	setTheme(theme);

	return {
		isDark,
		color,
		theme,
		themes,
		setTheme,
		changeDark
	};
});