// import { isString, isNumber, isBoolean, isObject } from 'lodash-es';

// 存储类型
export type StorageType = 'localStorage' | 'sessionStorage';

// 存储配置
export interface StorageConfig {
	type?: StorageType;
	prefix?: string;
	expire?: number;
}

// 存储数据
export interface StorageData {
	value: any;
	expire?: number;
}

class Storage {
	private type: StorageType;
	private prefix: string;

	constructor(config: StorageConfig = {}) {
		this.type = config.type || 'localStorage';
		this.prefix = config.prefix || 'btc_';
	}

	// 获取存储对象
	private getStorage() {
		return window[this.type];
	}

	// 生成键名
	private getKey(key: string): string {
		return this.prefix + key;
	}

	// 设置数据
	set(key: string, value: any, expire?: number): void {
		const data: StorageData = {
			value,
			expire: expire ? Date.now() + expire * 1000 : 0
		};

		try {
			this.getStorage().setItem(this.getKey(key), JSON.stringify(data));
		} catch (error) {
			console.error('Storage set error:', error);
		}
	}

	// 获取数据
	get(key: string, defaultValue?: any): any {
		try {
			const item = this.getStorage().getItem(this.getKey(key));
			
			if (!item) {
				return defaultValue;
			}

			const data: StorageData = JSON.parse(item);

			// 检查是否过期
			if (data.expire && Date.now() > data.expire) {
				this.remove(key);
				return defaultValue;
			}

			return data.value;
		} catch (error) {
			console.error('Storage get error:', error);
			return defaultValue;
		}
	}

	// 删除数据
	remove(key: string): void {
		try {
			this.getStorage().removeItem(this.getKey(key));
		} catch (error) {
			console.error('Storage remove error:', error);
		}
	}

	// 清空数据
	clear(): void {
		try {
			const storage = this.getStorage();
			const keys = Object.keys(storage);
			
			keys.forEach(key => {
				if (key.startsWith(this.prefix)) {
					storage.removeItem(key);
				}
			});
		} catch (error) {
			console.error('Storage clear error:', error);
		}
	}

	// 检查是否存在
	has(key: string): boolean {
		return this.get(key) !== undefined;
	}

	// 检查是否过期
	isExpired(key: string): boolean {
		try {
			const item = this.getStorage().getItem(this.getKey(key));
			
			if (!item) {
				return true;
			}

			const data: StorageData = JSON.parse(item);
			return data.expire ? Date.now() > data.expire : false;
		} catch (error) {
			return true;
		}
	}

	// 获取所有键
	keys(): string[] {
		try {
			const storage = this.getStorage();
			const keys = Object.keys(storage);
			
			return keys
				.filter(key => key.startsWith(this.prefix))
				.map(key => key.substring(this.prefix.length));
		} catch (error) {
			return [];
		}
	}

	// 获取所有数据
	all(): Record<string, any> {
		const result: Record<string, any> = {};
		
		this.keys().forEach(key => {
			result[key] = this.get(key);
		});

		return result;
	}
}

// 创建默认实例
const storage = new Storage();

export default storage;
