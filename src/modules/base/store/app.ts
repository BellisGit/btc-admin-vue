import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

export const useAppStore = defineStore('app', () => {
  // 应用信息
  const info = reactive({
    name: 'BTC-SaaS',
    version: '1.0.0',
    description: '拜里斯科技车间管理系统'
  });

  // 应用状态
  const loading = ref(false);
  const collapsed = ref(false);
  const fullscreen = ref(false);

  // 计算属性
  const isFold = computed(() => collapsed.value);
  const isFull = computed(() => fullscreen.value);

  // 事件系统
  const events = reactive<{ [key: string]: Function[] }>({});

  // 添加事件监听
  function addEvent(name: string, callback: Function) {
    if (!events[name]) {
      events[name] = [];
    }
    events[name].push(callback);
  }

  // 触发事件
  function emitEvent(name: string, ...args: any[]) {
    if (events[name]) {
      events[name].forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(`Event ${name} callback error:`, error);
        }
      });
    }
  }

  // 移除事件监听
  function removeEvent(name: string, callback?: Function) {
    if (events[name]) {
      if (callback) {
        const index = events[name].indexOf(callback);
        if (index > -1) {
          events[name].splice(index, 1);
        }
      } else {
        events[name] = [];
      }
    }
  }

  // 设置加载状态
  function setLoading(value: boolean) {
    loading.value = value;
  }

  // 切换侧边栏折叠状态
  function toggleCollapsed() {
    collapsed.value = !collapsed.value;
  }

  // 设置侧边栏折叠状态
  function setCollapsed(value: boolean) {
    collapsed.value = value;
  }

  // 切换全屏状态
  function toggleFullscreen() {
    fullscreen.value = !fullscreen.value;
  }

  // 设置全屏状态
  function setFullscreen(value: boolean) {
    fullscreen.value = value;
  }

  // 折叠侧边栏（兼容 Cool-Admin 的 fold 方法）
  function fold(value?: boolean) {
    if (value !== undefined) {
      collapsed.value = value;
    } else {
      collapsed.value = !collapsed.value;
    }
  }

  return {
    // 状态
    info,
    loading,
    collapsed,
    fullscreen,
    events,

    // 计算属性
    isFold,
    isFull,

    // 方法
    addEvent,
    emitEvent,
    removeEvent,
    setLoading,
    toggleCollapsed,
    setCollapsed,
    toggleFullscreen,
    setFullscreen,
    fold
  };
});
