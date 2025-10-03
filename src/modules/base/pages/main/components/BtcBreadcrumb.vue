<template>
  <div class="btc-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="item.path"
        :to="index === breadcrumbList.length - 1 ? undefined : item.path"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBtc } from '/@/btc';

defineOptions({
  name: 'BtcBreadcrumb'
});

const { router } = useBtc();

// 面包屑列表
const breadcrumbList = computed(() => {
  const route = router.currentRoute.value;
  const matched = route.matched;
  
  const breadcrumbs = [];
  
  // 添加首页
  breadcrumbs.push({
    path: '/',
    title: '首页'
  });
  
  // 添加当前路由的面包屑
  matched.forEach(match => {
    if (match.meta?.title && match.path !== '/') {
      breadcrumbs.push({
        path: match.path,
        title: match.meta.title as string
      });
    }
  });
  
  return breadcrumbs;
});
</script>

<style lang="scss" scoped>
.btc-breadcrumb {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: var(--el-bg-color);
  margin-bottom: 10px;
  min-height: 40px;
  box-sizing: border-box;
  
  :deep(.el-breadcrumb) {
    font-size: 13px;
    line-height: 1;
    
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        color: var(--el-text-color-regular);
        transition: color 0.2s;
        
        &:hover {
          color: var(--el-color-primary);
        }
      }
      
      &:last-child {
        .el-breadcrumb__inner {
          color: var(--el-text-color-primary);
          font-weight: 500;
        }
      }
    }
    
    .el-breadcrumb__separator {
      color: var(--el-text-color-secondary);
    }
  }
}
</style>
