import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { storage } from '/@/btc/utils';
import { config } from '/@/config';

// 请求配置
export interface RequestConfig extends AxiosRequestConfig {
	loading?: boolean;
	showError?: boolean;
}

// 响应数据
export interface ResponseData<T = any> {
	code: number;
	message: string;
	data: T;
}

// 基础服务类
export class BaseService {
	public namespace: string;
	public request: (config: RequestConfig) => Promise<ResponseData>;

	constructor(namespace: string) {
		this.namespace = namespace;
		this.request = this.createRequest();
	}

	// 创建请求方法
	private createRequest(): any {
		// 创建 axios 实例
		const instance = axios.create({
    baseURL: config.api?.baseUrl || import.meta.env['VITE_API_BASE_URL'] || '/api',
			timeout: 10000,
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// 请求拦截器
		instance.interceptors.request.use(
			(config) => {
				// 添加 token
				const token = storage.get('token');
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}

				// 添加命名空间
				if (this.namespace) {
					config.url = `/${this.namespace}${config.url}`;
				}

				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		// 响应拦截器
		instance.interceptors.response.use(
			(response: any) => {
				const { data } = response;

				// 处理业务错误
				if (data.code !== 0) {
      ElMessage.error(data.message || '请求失败' as any);
					return Promise.reject(new Error(data.message || '请求失败'));
				}

				return data;
			},
			(error) => {
				// 处理网络错误
				const message = error.response?.data?.message || error.message || '网络错误';
				ElMessage.error(message);
				return Promise.reject(error);
			}
		);

		// 返回请求方法
		return (config: RequestConfig) => {
			return instance.request(config);
		};
	}
}

// 服务对象
export const service: Record<string, any> = {};
