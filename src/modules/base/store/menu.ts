import { defineStore } from 'pinia';
import { ref } from 'vue';

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

export const useMenuStore = defineStore('menu', () => {
  // 菜单列表
  const list = ref<MenuItem[]>([]);
  
  // 菜单加载状态
  const loading = ref(false);

  // 设置菜单列表
  function setList(data: MenuItem[]) {
    list.value = data;
  }

  // 获取菜单列表
  async function get() {
    if (loading.value) return;
    
    loading.value = true;
    
    try {
      // 这里应该调用实际的 API
      // const res = await service.base.sys.menu.list();
      // setList(res);
      
      // 模拟菜单数据
      const mockMenus: MenuItem[] = [
        {
          id: 1,
          parentId: 0,
          name: 'dashboard',
          path: '/dashboard',
          component: 'dashboard/index',
          icon: 'icon-home',
          sort: 1,
          visible: true,
          meta: {
            label: '仪表盘',
            icon: 'icon-home'
          }
        },
        {
          id: 2,
          parentId: 0,
          name: 'system',
          path: '/system',
          component: 'layout',
          icon: 'icon-set',
          sort: 2,
          visible: true,
          meta: {
            label: '系统管理',
            icon: 'icon-set'
          },
          children: [
            {
              id: 21,
              parentId: 2,
              name: 'user',
              path: '/system/user',
              component: 'system/user/index',
              icon: 'icon-user',
              sort: 1,
              visible: true,
              meta: {
                label: '用户管理',
                icon: 'icon-user'
              }
            },
            {
              id: 22,
              parentId: 2,
              name: 'role',
              path: '/system/role',
              component: 'system/role/index',
              icon: 'icon-role',
              sort: 2,
              visible: true,
              meta: {
                label: '角色管理',
                icon: 'icon-role'
              }
            }
          ]
        }
      ];
      
      setList(mockMenus);
    } catch (error) {
      console.error('获取菜单失败:', error);
    } finally {
      loading.value = false;
    }
  }

  // 根据路径查找菜单
  function findByPath(path: string): MenuItem | null {
    function findInList(menus: MenuItem[]): MenuItem | null {
      for (const menu of menus) {
        if (menu.path === path) {
          return menu;
        }
        if (menu.children) {
          const found = findInList(menu.children);
          if (found) return found;
        }
      }
      return null;
    }
    
    return findInList(list.value);
  }

  // 获取面包屑导航
  function getBreadcrumb(path: string): MenuItem[] {
    const breadcrumb: MenuItem[] = [];
    
    function findPath(menus: MenuItem[], targetPath: string, currentPath: MenuItem[] = []): boolean {
      for (const menu of menus) {
        const newPath = [...currentPath, menu];
        
        if (menu.path === targetPath) {
          breadcrumb.push(...newPath);
          return true;
        }
        
        if (menu.children && findPath(menu.children, targetPath, newPath)) {
          return true;
        }
      }
      return false;
    }
    
    findPath(list.value, path);
    return breadcrumb;
  }

  // 获取侧边栏菜单（过滤隐藏的菜单）
  function getSidebarMenus(): MenuItem[] {
    function filterMenus(menus: MenuItem[]): MenuItem[] {
      return menus
        .filter(menu => menu.visible && !menu.meta?.hidden)
        .map(menu => ({
          ...menu,
          children: menu.children ? filterMenus(menu.children) : undefined
        }))
        .sort((a, b) => a.sort - b.sort);
    }
    
    return filterMenus(list.value);
  }

  return {
    // 状态
    list,
    loading,

    // 方法
    setList,
    get,
    findByPath,
    getBreadcrumb,
    getSidebarMenus
  };
});
