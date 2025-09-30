import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { storage } from '/@/btc/utils';

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const info = reactive({
    id: 0,
    username: '',
    nickname: '',
    avatar: '',
    email: '',
    phone: '',
    roles: [] as string[],
    permissions: [] as string[]
  });

  // 用户状态
  const token = ref(storage.get('token') || '');
  const isLogin = ref(!!token.value);

  // 设置用户信息
  function setInfo(data: any) {
    Object.assign(info, data);
  }

  // 设置 token
  function setToken(value: string) {
    token.value = value;
    isLogin.value = !!value;
    
    if (value) {
      storage.set('token', value);
    } else {
      storage.remove('token');
    }
  }

  // 获取用户信息
  async function get() {
    if (!token.value) {
      return;
    }

    try {
      // 这里应该调用实际的 API
      // const res = await service.base.sys.user.info();
      // setInfo(res);
      
      // 模拟数据
      setInfo({
        id: 1,
        username: 'admin',
        nickname: '管理员',
        avatar: '',
        email: 'admin@btc.com',
        phone: '13800138000',
        roles: ['admin'],
        permissions: ['*']
      });
    } catch (error) {
      console.error('获取用户信息失败:', error);
      // 如果获取用户信息失败，清除 token
      setToken('');
    }
  }

  // 登录
  async function login(_data: { username: string; password: string }) {
    try {
      // 这里应该调用实际的登录 API
      // const res = await service.base.sys.user.login(data);
      // setToken(res.token);
      
      // 模拟登录
      setToken('mock-token-' + Date.now());
      await get();
      
      return { success: true };
    } catch (error) {
      console.error('登录失败:', error);
      return { success: false, message: '登录失败' };
    }
  }

  // 登出
  function logout() {
    setToken('');
    setInfo({
      id: 0,
      username: '',
      nickname: '',
      avatar: '',
      email: '',
      phone: '',
      roles: [],
      permissions: []
    });
  }

  // 检查权限
  function hasPermission(permission: string): boolean {
    if (!permission) return true;
    if (info.permissions.includes('*')) return true;
    return info.permissions.includes(permission);
  }

  // 检查角色
  function hasRole(role: string): boolean {
    if (!role) return true;
    return info.roles.includes(role);
  }

  return {
    // 状态
    info,
    token,
    isLogin,

    // 方法
    setInfo,
    setToken,
    get,
    login,
    logout,
    hasPermission,
    hasRole
  };
});
