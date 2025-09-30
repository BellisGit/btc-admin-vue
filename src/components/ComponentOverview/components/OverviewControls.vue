<template>
  <div class="overview-controls">
    <div class="search-box">
      <el-input
        :model-value="search"
        @update:model-value="$emit('update:search', $event)"
        placeholder="搜索组件..."
        clearable
      />
    </div>
    
    <div class="filter-tabs">
      <el-tabs 
        :model-value="tab"
        @update:model-value="$emit('update:tab', $event)"
        @tab-change="$emit('tab-change', $event)"
      >
        <el-tab-pane label="全部" name="all" />
        <el-tab-pane label="项目级" name="project" />
        <el-tab-pane label="模块级" name="module" />
        <el-tab-pane label="页面级" name="page" />
      </el-tabs>
    </div>
    
    <div class="type-filter">
      <el-select 
        :model-value="type"
        @update:model-value="$emit('update:type', $event)"
        placeholder="组件类型" 
        clearable
      >
        <el-option label="基础组件" value="base" />
        <el-option label="复合组件" value="composite" />
        <el-option label="业务组件" value="business" />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  search: string
  tab: string
  type: string
}

interface Emits {
  (e: 'update:search', value: string): void
  (e: 'update:tab', value: string): void
  (e: 'update:type', value: string): void
  (e: 'tab-change', tab: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.overview-controls {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 200px;
}

.filter-tabs {
  flex-shrink: 0;
}

.type-filter {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .overview-controls {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
