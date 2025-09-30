import { storage } from '/@/btc/utils';

// 权限相关工具函数
export const permission = {
  // 检查是否有权限
  has(permission: string): boolean {
    const userStore = useUserStore();
    return userStore.hasPermission(permission);
  },

  // 检查是否有角色
  hasRole(role: string): boolean {
    const userStore = useUserStore();
    return userStore.hasRole(role);
  },

  // 检查是否已登录
  isLogin(): boolean {
    const userStore = useUserStore();
    return userStore.isLogin;
  }
};

// 菜单相关工具函数
export const menu = {
  // 获取当前菜单
  getCurrent(path: string) {
    const menuStore = useMenuStore();
    return menuStore.findByPath(path);
  },

  // 获取面包屑
  getBreadcrumb(path: string) {
    const menuStore = useMenuStore();
    return menuStore.getBreadcrumb(path);
  },

  // 获取侧边栏菜单
  getSidebar() {
    const menuStore = useMenuStore();
    return menuStore.getSidebarMenus();
  }
};

// 应用相关工具函数
export const app = {
  // 设置加载状态
  setLoading(loading: boolean) {
    const appStore = useAppStore();
    appStore.setLoading(loading);
  },

  // 切换侧边栏
  toggleSidebar() {
    const appStore = useAppStore();
    appStore.toggleCollapsed();
  },

  // 设置侧边栏状态
  setSidebar(collapsed: boolean) {
    const appStore = useAppStore();
    appStore.setCollapsed(collapsed);
  },

  // 切换全屏
  toggleFullscreen() {
    const appStore = useAppStore();
    appStore.toggleFullscreen();
  }
};

// 用户相关工具函数
export const user = {
  // 获取用户信息
  getInfo() {
    const userStore = useUserStore();
    return userStore.info;
  },

  // 获取 token
  getToken() {
    const userStore = useUserStore();
    return userStore.token;
  },

  // 登出
  logout() {
    const userStore = useUserStore();
    userStore.logout();
  }
};

// 导入 store 函数（避免循环依赖）
function useUserStore() {
  const { useUserStore } = require('./store/user');
  return useUserStore();
}

function useMenuStore() {
  const { useMenuStore } = require('./store/menu');
  return useMenuStore();
}

function useAppStore() {
  const { useAppStore } = require('./store/app');
  return useAppStore();
}
