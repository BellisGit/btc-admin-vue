import { ElMessage } from 'element-plus';
import {
	createRouter,
	createRouterMatcher,
	// createWebHashHistory,
	createWebHistory,
	type RouteRecordRaw
} from 'vue-router';
import { type Router } from '/@/btc/types';
import { storage } from '/@/btc/utils';
import { module } from '/@/btc/module';
import { isArray } from 'lodash-es';
import { Loading } from '/@/btc/utils';
// import { config, isDev } from '/@/config';

// 基本路径
const baseUrl = import.meta.env.BASE_URL;

// 扫描文件
const files = import.meta.glob(['/src/modules/*/{views,pages}/**/*', '!**/components']);

// 默认路由
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'index',
		component: () => import('../../modules/base/pages/main/index.vue'),
		children: [
			{
				path: '',
				name: 'home',
				component: () => import('../../modules/base/pages/home/index.vue'),
				meta: {
					title: '首页',
					isHome: true
				}
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../../modules/base/pages/auth/login/index.vue')
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('../../modules/base/pages/auth/register/index.vue')
	},
	{
		path: '/forget-password',
		name: 'forget-password',
		component: () => import('../../modules/base/pages/auth/forget-password/index.vue')
	},
	{
		path: '/404',
		name: '404',
		component: () => import('../../modules/base/pages/error/404.vue')
	},
	{
		path: '/:catchAll(.*)',
		name: 'not-found',
		component: () => import('../../modules/base/pages/error/404.vue')
	}
];

// 创建路由器
const router = createRouter({
	history: createWebHistory(baseUrl),
	routes
}) as Router;

// 组件加载后
router.beforeResolve(() => {
	Loading.close();
});

let lock = false;

// 错误监听
router.onError((error: Error) => {
	if (!lock) {
		lock = true;

		// 显示错误信息
   ElMessage.error(`页面存在错误：${error.message}` as any);
		console.error(error);

		// 如果是动态加载模块失败的错误，且非开发环境，则刷新页面
		if (error.message?.includes('Failed to fetch dynamically imported module')) {
			if (import.meta.env.PROD) {
				window.location.reload();
			}
		}

		// 短暂延迟后解锁，允许后续错误处理
		setTimeout(() => {
			lock = false;
		}, 0);
	}
});

// 添加视图，页面路由
router.append = function (routeData) {
	if (!routeData) {
		return false; // 如果没有路由数据，直接返回
	}

	// 确保 routeData 是数组
	const routeList = isArray(routeData) ? routeData : [routeData];

	routeList.forEach(route => {
		if (!route.meta) {
			route.meta = {}; // 初始化 meta 对象
		}

		// 如果没有指定组件路径
		if (!route.component) {
			const viewPath = route.viewPath;

			if (viewPath) {
				if (viewPath.startsWith('http')) {
					// 如果是外部链接，使用 iframe 组件
					route.meta.iframeUrl = viewPath;
      route.component = () => import('../../modules/base/pages/main/index.vue');
				} else {
					// 从文件系统中动态导入组件
					route.component = files['/src/' + viewPath.replace('btc/', '')];
				}
			} else if (!route.redirect) {
				// 如果没有组件路径且没有重定向，默认重定向到 404
				route.redirect = '/404';
			}
		}

		// 支持 props 接收参数
		route.props = true;

		// 标记为动态添加的路由
		route.meta.dynamic = true;

		// 判断是页面还是视图，并添加到相应的路由
		if (route.isPage || route.viewPath?.includes('/pages/')) {
			router.addRoute(route);
		} else {
			router.addRoute('index', route);
		}
	});
};

// 删除路由
router.del = function (routeName) {
	const allRoutes = router.getRoutes();

	allRoutes.forEach(route => {
		if (route.name === routeName) {
			router.removeRoute(routeName); // 移除指定名称的路由
		}
	});
};

// 清空路由
router.clear = function () {
	const allRoutes = router.getRoutes();

	allRoutes.forEach(route => {
		if (route.name && route.meta?.dynamic) {
			router.removeRoute(route.name); // 移除所有动态添加的路由
		}
	});
};

// 找路由
router.find = function (path: string) {
	// 获取已注册的路由
	const registeredRoutes = router.getRoutes();

	// 构建路由列表，包括已注册的路由和模块自定义路由
	const routeList: any[] = [
		...registeredRoutes.map(route => ({
			...route,
			isReg: true
		})),
		...module.list.flatMap(module => (module.views || []).concat(module.pages || []))
	];

	let isRegistered = false;
	let matchedRoute: (typeof routeList)[number] | undefined;

	// 创建路由匹配器
	const matcher = createRouterMatcher(routeList, {});

	// 查找匹配的路由
	matcher.getRoutes().find(route => {
		const routeRegex = new RegExp(route.re);

		if (routeRegex.test(path)) {
			if (path === '/') {
				// 如果路径是根路径，查找标记为首页的路由，如果没有则查找根路径路由
				matchedRoute = routeList.find(route => route.meta?.isHome) || 
					routeList.find(route => route.path === '/');
			} else {
				// 否则查找路径匹配且名称不是 'index' 的路由
				matchedRoute = routeList.find(
					r => r.path === route.record.path && r.name !== 'index'
				);
			}

			if (matchedRoute) {
				isRegistered = !!matchedRoute.isReg; // 检查路由是否已注册
			}

			return true;
		}
		return false;
	});

	return {
		route: matchedRoute,
		isReg: isRegistered
	};
};

// 路由守卫
router.beforeEach(async (to, _from, next) => {
	// 等待应用配置加载完，添加超时机制
	try {
		await Promise.race([
			Loading.wait(),
			new Promise(resolve => setTimeout(resolve, 5000)) // 5秒超时
		]);
	} catch (error) {
		console.warn('Loading timeout, continuing...', error);
	}

	// 查找路由信息
	const { isReg, route } = router.find(to.path);

	// 如果路由不存在
	if (!route) {
		next('/404'); // 重定向到 404
		return;
	}

	// 如果路由未注册
	if (!isReg) {
		router.append(route); // 注册路由
		next(to.fullPath); // 重定向到原路径
		return;
	}

	// 检查 token
	const token = storage.get('token');
	if (!token) {
		// 如果路径不在忽略 Token 验证的列表中，重定向到登录页
		if (!['/login', '/register', '/forget-password', '/404'].includes(to.path)) {
			next('/login');
			return;
		}
	}

	next(); // 继续导航
});

// 组件加载后
router.beforeResolve(() => {
	Loading.close();
});

export { router };
