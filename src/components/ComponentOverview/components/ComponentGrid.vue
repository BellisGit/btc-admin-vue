<template>
  <div class="component-grid">
    <div
      v-for="component in components"
      :key="component.name"
      class="component-card"
      :class="{
        'migrated': component.status === 'migrated',
        'pending': component.status === 'pending',
        'deprecated': component.status === 'deprecated'
      }"
      @click="$emit('select', component)"
    >
      <div class="card-header">
        <div class="component-name">
          <span class="name">{{ component.name }}</span>
          <span class="version" v-if="component.version">v{{ component.version }}</span>
        </div>
        <div class="component-status">
          <el-tag
            :type="getStatusType(component.status)"
            size="small"
          >
            {{ getStatusText(component.status) }}
          </el-tag>
        </div>
      </div>
      
      <div class="card-content">
        <div class="component-description">
          {{ component.description }}
        </div>
        
        <div class="component-tags">
          <el-tag
            v-for="tag in component.tags"
            :key="tag"
            size="small"
            type="info"
            class="tag"
          >
            {{ tag }}
          </el-tag>
        </div>
        
        <div class="component-meta">
          <div class="meta-item">
            <span class="meta-label">类型:</span>
            <span class="meta-value">{{ component.type }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">作用域:</span>
            <span class="meta-value">{{ component.scope }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">使用次数:</span>
            <span class="meta-value">{{ component.usageCount }}</span>
          </div>
        </div>
      </div>
      
      <div class="card-actions">
        <el-button
          v-if="component.documentation"
          type="primary"
          size="small"
          @click.stop="$emit('open-docs', component)"
        >
          查看文档
        </el-button>
        <el-button
          v-if="component.status === 'pending'"
          type="success"
          size="small"
          @click.stop="$emit('migrate', component)"
        >
          迁移
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComponentMetadata } from '../../ComponentRegistry'

interface Props {
  components: ComponentMetadata[]
}

interface Emits {
  (e: 'select', component: ComponentMetadata): void
  (e: 'migrate', component: ComponentMetadata): void
  (e: 'open-docs', component: ComponentMetadata): void
}

defineProps<Props>()
defineEmits<Emits>()

const getStatusType = (status: string) => {
  const statusMap = {
    migrated: 'success',
    pending: 'warning',
    deprecated: 'danger',
    stable: 'info'
  }
  return statusMap[status] || 'info'
}

const getStatusText = (status: string) => {
  const statusMap = {
    migrated: '已迁移',
    pending: '待迁移',
    deprecated: '已废弃',
    stable: '稳定'
  }
  return statusMap[status] || status
}
</script>

<style scoped>
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 16px;
}

.component-card {
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.component-card:hover {
  border-color: var(--el-color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.component-card.migrated {
  border-left: 4px solid var(--el-color-success);
}

.component-card.pending {
  border-left: 4px solid var(--el-color-warning);
}

.component-card.deprecated {
  border-left: 4px solid var(--el-color-danger);
  opacity: 0.7;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.component-name {
  flex: 1;
}

.name {
  font-size: 16px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}

.version {
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-left: 8px;
}

.component-status {
  flex-shrink: 0;
}

.card-content {
  margin-bottom: 16px;
}

.component-description {
  font-size: 14px;
  color: var(--el-text-color-regular);
  line-height: 1.5;
  margin-bottom: 12px;
}

.component-tags {
  margin-bottom: 12px;
}

.tag {
  margin-right: 6px;
  margin-bottom: 4px;
}

.component-meta {
  font-size: 12px;
  color: var(--el-text-color-regular);
}

.meta-item {
  display: flex;
  margin-bottom: 4px;
}

.meta-label {
  font-weight: 500;
  margin-right: 8px;
  min-width: 60px;
}

.meta-value {
  color: var(--el-text-color-primary);
}

.card-actions {
  display: flex;
  gap: 8px;
}

@media (max-width: 768px) {
  .component-grid {
    grid-template-columns: 1fr;
  }
}
</style>
