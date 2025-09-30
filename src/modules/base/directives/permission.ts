import type { Directive } from 'vue';
import { useUserStore } from '../store/user';

// 权限指令
const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding;
    const userStore = useUserStore();
    
    if (value) {
      const hasPermission = userStore.hasPermission(value);
      if (!hasPermission) {
        el.style.display = 'none';
        // 或者移除元素
        // el.parentNode?.removeChild(el);
      }
    }
  },
  
  updated(el, binding) {
    const { value } = binding;
    const userStore = useUserStore();
    
    if (value) {
      const hasPermission = userStore.hasPermission(value);
      if (hasPermission) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    }
  }
};

// 角色指令
const role: Directive = {
  mounted(el, binding) {
    const { value } = binding;
    const userStore = useUserStore();
    
    if (value) {
      const hasRole = userStore.hasRole(value);
      if (!hasRole) {
        el.style.display = 'none';
      }
    }
  },
  
  updated(el, binding) {
    const { value } = binding;
    const userStore = useUserStore();
    
    if (value) {
      const hasRole = userStore.hasRole(value);
      if (hasRole) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    }
  }
};

// 默认导出
export default permission;

// 命名导出
export { permission, role };