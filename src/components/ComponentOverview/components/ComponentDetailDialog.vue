<template>
  <el-dialog
    :model-value="modelValue"
    :title="component?.name"
    width="800px"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="$emit('close')"
  >
    <div v-if="component" class="component-detail">
      <div class="detail-section">
        <h3>基本信息</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="label">组件名称:</span>
            <span class="value">{{ component.name }}</span>
          </div>
          <div class="detail-item">
            <span class="label">组件类型:</span>
            <span class="value">{{ component.type }}</span>
          </div>
          <div class="detail-item">
            <span class="label">作用域:</span>
            <span class="value">{{ component.scope }}</span>
          </div>
          <div class="detail-item">
            <span class="label">状态:</span>
            <el-tag :type="getStatusType(component.status)">
              {{ getStatusText(component.status) }}
            </el-tag>
          </div>
          <div class="detail-item">
            <span class="label">维护者:</span>
            <span class="value">{{ component.maintainer }}</span>
          </div>
          <div class="detail-item">
            <span class="label">最后更新:</span>
            <span class="value">{{ component.lastUpdated }}</span>
          </div>
        </div>
      </div>
      
      <div class="detail-section">
        <h3>使用统计</h3>
        <div class="usage-stats">
          <div class="usage-item">
            <span class="usage-label">使用次数:</span>
            <span class="usage-value">{{ component.usageCount }}</span>
          </div>
          <div class="usage-item">
            <span class="usage-label">使用模块:</span>
            <div class="usage-modules">
              <el-tag
                v-for="module in component.usedInModules"
                :key="module"
                size="small"
                class="module-tag"
              >
                {{ module }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
      
      <div class="detail-section">
        <h3>依赖关系</h3>
        <div class="dependencies">
          <div v-if="component.dependencies.length > 0">
            <h4>依赖组件:</h4>
            <div class="dependency-list">
              <el-tag
                v-for="dep in component.dependencies"
                :key="dep"
                size="small"
                type="warning"
              >
                {{ dep }}
              </el-tag>
            </div>
          </div>
          <div v-if="component.dependents.length > 0">
            <h4>被依赖组件:</h4>
            <div class="dependency-list">
              <el-tag
                v-for="dep in component.dependents"
                :key="dep"
                size="small"
                type="success"
              >
                {{ dep }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import type { ComponentMetadata } from '../../ComponentRegistry'

interface Props {
  modelValue: boolean
  component: ComponentMetadata | null
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
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
.component-detail {
  max-height: 600px;
  overflow-y: auto;
}

.detail-section {
  margin-bottom: 24px;
}

.detail-section h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  color: var(--el-text-color-primary);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
}

.detail-item .label {
  font-weight: 500;
  margin-right: 8px;
  min-width: 80px;
  color: var(--el-text-color-regular);
}

.detail-item .value {
  color: var(--el-text-color-primary);
}

.usage-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.usage-item {
  display: flex;
  align-items: center;
}

.usage-label {
  font-weight: 500;
  margin-right: 8px;
  min-width: 80px;
  color: var(--el-text-color-regular);
}

.usage-value {
  color: var(--el-text-color-primary);
}

.usage-modules {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.module-tag {
  margin-right: 4px;
}

.dependencies h4 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--el-text-color-primary);
}

.dependency-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
}
</style>
