<template>
  <div class="overview-header">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-content">
          <div class="stat-number">{{ stats.total }}</div>
          <div class="stat-label">总组件数</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🏗️</div>
        <div class="stat-content">
          <div class="stat-number">{{ stats.byScope.project || 0 }}</div>
          <div class="stat-label">项目级组件</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🔧</div>
        <div class="stat-content">
          <div class="stat-number">{{ stats.byScope.module || 0 }}</div>
          <div class="stat-label">模块级组件</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📄</div>
        <div class="stat-content">
          <div class="stat-number">{{ stats.byScope.page || 0 }}</div>
          <div class="stat-label">页面级组件</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComponentStats } from '../../ComponentRegistry'

interface Props {
  stats: ComponentStats
}

defineProps<Props>()
</script>

<style scoped>
.overview-header {
  margin-bottom: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: var(--el-color-primary);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 24px;
  margin-right: 16px;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: var(--el-color-primary);
  line-height: 1;
}

.stat-label {
  font-size: 14px;
  color: var(--el-text-color-regular);
  margin-top: 4px;
}
</style>
