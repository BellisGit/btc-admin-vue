// Base 模块类型定义

// 用户信息类型
export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  email: string;
  phone: string;
  roles: string[];
  permissions: string[];
}

// 菜单项类型
export interface MenuItem {
  id: number;
  parentId: number;
  name: string;
  path: string;
  component?: string;
  icon?: string;
  sort: number;
  visible: boolean;
  children?: MenuItem[];
  meta?: {
    label?: string;
    icon?: string;
    keepAlive?: boolean;
    hidden?: boolean;
    [key: string]: any;
  };
}

// 应用信息类型
export interface AppInfo {
  name: string;
  version: string;
  description: string;
}

// 登录参数类型
export interface LoginParams {
  username: string;
  password: string;
  captcha?: string;
}

// 登录响应类型
export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: UserInfo;
}

// 权限检查类型
export interface PermissionCheck {
  permission?: string;
  role?: string;
}

// 面包屑项类型
export interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: string;
}

// 模块配置类型
export interface BaseModuleConfig {
  order: number;
  ignore: {
    NProgress?: string[];
    token?: string[];
  };
  components?: any[];
  views?: any[];
  pages?: any[];
  install?: (app: any, options?: any) => void;
  onLoad?: (events: any) => Promise<any>;
}
