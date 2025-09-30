import type { ModuleConfig } from '/@/btc';
import { useStore } from './store';
import { config } from '/@/config';
import './static/css/index.scss';

export default (): ModuleConfig => ({
	label: '基础模块',
	description: '系统基础功能模块',
	version: '1.0.0',
	author: 'BTC-SaaS',
	order: 99,
	enable: true,
	ignore: {
		NProgress: [
			'/base/open/eps',
			'/base/comm/person',
			'/base/comm/permmenu',
			'/base/comm/upload',
			'/base/comm/uploadMode'
		],
		token: ['/login', '/register', '/forget-password', '/401', '/403', '/404', '/500', '/502']
	},
	components: Object.values(import.meta.glob('./components/**/*.{vue,tsx}')),
	views: [
		{
			path: '/my/info',
			meta: {
				label: '个人中心'
			},
			component: () => import('./views/info.vue')
		}
	],
	pages: [
		...['401', '403', '404', '500', '502'].map(code => {
			return {
				path: `/${code}`,
				meta: {
					process: false
				},
				component: () => import(`./pages/error/${code}.vue`)
			};
		})
	],
	install(app) {
		// 设置标题
		document.title = config.app.name;

		// 设置加载文案
		const loading = document.querySelector('#Loading');

		if (loading) {
			const name = loading.querySelector('.preload__name');
			const title = loading.querySelector('.preload__title');
			const subTitle = loading.querySelector('.preload__sub-title');

			if (name) {
				name.innerHTML = config.app.name;
			}
			if (title) {
				title.innerHTML = '正在加载资源...';
			}
			if (subTitle) {
				subTitle.innerHTML = '初次加载资源可能需要较多时间，请耐心等待';
			}
		}
	},
	async onLoad() {
		const { user, menu, app } = useStore();

		// token 事件
		async function hasToken(cb: () => Promise<any> | void) {
			if (cb) {
				app.addEvent('hasToken', cb);

				if (user.token) {
					await cb();
				}
			}
		}

		await hasToken(async () => {
			// 获取用户信息
			user.get();
			// 获取菜单权限
			await menu.get();
		});

		return {
			hasToken
		};
	}
});
