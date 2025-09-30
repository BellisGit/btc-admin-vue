import { ref, reactive } from 'vue';
import { config } from '/@/config';

// 应用信息
const app = reactive({
	info: {
		name: config.app.name || 'BTC-SaaS',
		version: '1.0.0',
		description: '拜里斯科技车间管理系统'
	}
});

// 用户信息
const user = ref({
	id: 0,
	username: '',
	nickname: '',
	avatar: '',
	roles: [] as string[],
	permissions: [] as string[]
});

// 菜单信息
const menu = ref({
	list: [] as any[],
	active: ''
});

// 主题信息
const theme = ref({
	mode: 'light' as 'light' | 'dark',
	primary: '#667eea'
});

export function useBase() {
	return {
		app,
		user,
		menu,
		theme
	};
}
