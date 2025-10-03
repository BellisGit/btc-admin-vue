<template>
  <div class="btc-views">
    <el-scrollbar>
      <div class="btc-views__container">
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBase } from '/$/base';

defineOptions({
  name: 'BtcViews'
});

const { app } = useBase();

// 缓存的视图列表
const cachedViews = computed(() => {
  // 暂时返回空数组，后续可以根据路由配置动态管理
  return [];
});
</script>

<style lang="scss" scoped>
.btc-views {
  flex: 1;
  overflow: hidden;
  margin: 0 10px 10px 10px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  border-radius: 6px;
  position: relative;

  :deep(.el-scrollbar__view) {
    height: 100%;
  }

  &__container {
    padding: 16px;
    min-height: 100%;
    background-color: var(--el-bg-color);
  }
}

// 页面切换动画
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
