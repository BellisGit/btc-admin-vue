import axios from 'axios';
import { ElMessage } from 'element-plus';
import { endsWith } from 'lodash-es';
import { storage } from '/@/btc/utils';
import { useBase } from '/$/base';
import { router } from '../router';
import { config } from '/@/config';

// 定义API响应类型
export interface ApiResponse<T = any> {
  code: number;
  msg: string;
  data: T;
  total?: number;
}

// 创建 axios 实例
const request = axios.create({
	baseURL: config.api?.baseUrl || import.meta.env['VITE_API_BASE_URL'] || '/api',
	timeout: 30000, // 请求超时时间
	withCredentials: false // 不携带凭证
});

// 刷新队列，用于存储请求重试回调
let queue: Array<(token: string) => void> = [];

// 标识是否正在刷新 token
let isRefreshing = false;

// 请求拦截器
request.interceptors.request.use(
	(req: any) => {
		const { user } = useBase(); // 获取用户信息

		if (!req.headers) {
			req.headers = {};
		}

		// 设置请求头中的语言
		if (req.headers['language'] !== null) {
			req.headers['language'] = config.i18n.locale;
		}

		// 验证 token
		if (user.token) {
			// 设置请求头中的 Authorization (直接返回token，不需要Bearer前缀)
			if (req.headers['Authorization'] !== null) {
				req.headers['Authorization'] = user.token;
			}

			// 特殊接口
			if (['eps', 'refreshToken'].some(e => endsWith(req.url, e))) {
				return req;
			}

			// 判断 token 是否过期
			if (storage.isExpired('token')) {
				// 判断 refreshToken 是否过期
				if (storage.isExpired('refreshToken')) {
					ElMessage.error('登录状态已失效，请重新登录');
					user.logout();
				} else {
					// 如果没有在刷新中，则刷新 token
					if (!isRefreshing) {
						isRefreshing = true;

						user.refreshToken()
							.then(token => {
								queue.forEach(cb => cb(token)); // 执行队列中的请求
								queue = [];
								isRefreshing = false;
							})
							.catch(() => {
								user.logout();
							});
					}

					// 返回一个新的 Promise，等待 token 刷新完成
					return new Promise(resolve => {
						queue.push(token => {
							if (req.headers) {
								req.headers['Authorization'] = token; // 设置新的 token (不需要Bearer前缀)
							}
							resolve(req);
						});
					});
				}
			}
		}

		return req;
	},
	error => {
		return Promise.reject(error); // 返回错误
	}
);

// 响应拦截器
request.interceptors.response.use(
	(res) => {
		if (!res?.data) {
			return res.data;
		}

		const { code, data, msg } = res.data;

		if (!code) {
			return res.data; // 原生响应
		}

		switch (code) {
			case 2000: // 成功
				return res.data; // 成功，返回完整响应数据
			default:
				// 不抛出错误，让业务逻辑自己处理
				return res.data; // 返回完整响应数据，包括错误信息
		}
	},
	async error => {
		if (error.response) {
			const { status } = error.response;
			const { user } = useBase();

			if (status == 401) {
				user.logout(); // 未授权，退出用户
			} else {
				switch (status) {
					case 403:
						router.push('/403'); // 禁止访问
						break;

					case 500:
						router.push('/500'); // 服务器内部错误
						break;

					case 502:
						router.push('/502'); // 网关错误
						break;
				}
			}
		}

		return Promise.reject({ message: error.response?.data?.message || error.message }); // 返回错误信息
	}
);

// 重写 request 函数的类型声明
const typedRequest = request as <T = any>(config: any) => Promise<ApiResponse<T>>;

export { typedRequest as request };
