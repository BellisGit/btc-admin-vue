import { createPinia } from 'pinia';
import { type App } from 'vue';
import { createModule } from './module';
import { router } from '/@/btc/router';
import { Loading } from '/@/btc/utils';
import { createEps } from './eps';
import { i18n } from '/@/plugins/i18n';
import 'virtual:svg-register';

export async function bootstrap(app: App) {
	// pinia
	app.use(createPinia());

	// i18n
	app.use(i18n);

	// 路由
	app.use(router);

	// 模块
	const { eventLoop } = createModule(app);

	// eps
	createEps();

	// 加载
	Loading.set([eventLoop()]);
}
