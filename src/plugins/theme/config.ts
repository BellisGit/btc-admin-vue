import { type ModuleConfig } from '/@/btc';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './static/css/index.scss';
import { useTheme } from './hooks';

export default (): ModuleConfig => {
	return {
		enable: true,
		order: 99,
		toolbar: {
			component: import('./components/theme.vue'),
			h5: false
		},
		options: {
			name: 'default',

			// 自定义主题色
			// color: "#4165d7",

			// 主题列表
			list: [
				{
					label: '默认',
					name: 'default',
					color: '#4165d7'
				},
				{
					label: '翠绿',
					name: 'cuilv',
					color: '#51C21A'
				},
				{
					label: '紫檀',
					name: 'zitan',
					color: '#d0378d'
				},
				{
					label: '金橙',
					name: 'jincheng',
					color: '#FFA500'
				},
				{
					label: '樱桃',
					name: 'yingtao',
					color: '#FF69B4'
				},
				{
					label: '薄荷',
					name: 'bohe',
					color: '#3EB489'
				},
				{
					label: '青灰',
					name: 'qinghui',
					color: '#708090'
				},
				{
					label: '珊瑚',
					name: 'shanhu',
					color: '#FF4500'
				}
			]
		},
		install() {
			useTheme();
		},

		label: '主题',
		description: '自定义主色、菜单分组、暗黑模式',
		author: 'BTC-SaaS',
		version: '1.0.0',
		updateTime: '2024-12-29'
	};
};
