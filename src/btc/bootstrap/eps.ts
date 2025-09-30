import { merge } from 'lodash-es';
import { BaseService, service } from '/@/btc/service';
import { hmr } from '/@/btc/hooks';
// import { isDev } from '/@/config';
import { eps } from 'virtual:eps';

// 使用虚拟模块的 eps 数据

export function createEps() {
	// 设置 request 方法
	function set(d: any) {
		if (d.namespace) {
			const a = new BaseService(d.namespace);

			for (const i in d) {
				const { path, method = 'get' } = d[i];

				if (path) {
					a.request = a.request;

					a[i] = function (data?: any) {
						return this.request({
							url: path,
							method,
							[method.toLocaleLowerCase() == 'post' ? 'data' : 'params']: data
						});
					};
				}
			}

			for (const i in a) {
				d[i] = a[i];
			}
		} else {
			for (const i in d) {
				set(d[i]);
			}
		}
	}

	// 遍历每一个方法
	set(eps.service);

	// 合并 eps
	merge(service, eps.service);

	// 热更新处理
	hmr.setData('service', service);
}

// 监听 vite 触发事件
if (import.meta.hot) {
	import.meta.hot.on('eps-update', ({ service }) => {
		if (service) {
			eps.service = service;
		}
		createEps();
	});
}
