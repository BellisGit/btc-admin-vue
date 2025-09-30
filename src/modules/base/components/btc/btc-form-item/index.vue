<template>
  <div
    class="btc-form-row"
    :style="rowStyle"
    ref="rowRef"
  >
    <!-- 直接投送 slot 给 el-form-item；也兼容自定义内容 -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue';

type LabelMode = 'auto' | 'fixed';

interface Props {
  /** 最少列宽，配合 auto-fill 实现响应式分栏 */
  minColWidth?: number; // px
  /** 栅格列间距（水平 + 垂直） */
  gap?: number; // px
  /** label 模式：auto=自量尺同一行最大值；fixed=统一固定宽度 */
  labelMode?: LabelMode;
  /** labelMode=fixed 时生效 */
  labelWidth?: number; // px
  /** 内容区最小宽度（防止长 label 吃掉过多空间） */
  minContentWidth?: number; // px
  /** 是否强制让输入控件撑满内容区 */
  fillControls?: boolean;
}

defineOptions({
  name: 'BtcFormItem',
  inheritAttrs: false
});

const props = withDefaults(defineProps<Props>(), {
  minColWidth: 360,
  gap: 16,
  labelMode: 'auto',
  labelWidth: 96, // 从 120px 调整为 96px，更紧凑
  minContentWidth: 200, // 稍微增加，确保输入框有足够空间
  fillControls: true,
});

const rowRef = ref<HTMLDivElement | null>(null);
const currentLabelWidth = ref<number>(props.labelMode === 'fixed' ? props.labelWidth : 0);

const rowStyle = computed(() => ({
  '--btc-row-gap': `${props.gap}px`,
  '--btc-label-width': `${currentLabelWidth.value || props.labelWidth}px`,
  '--btc-min-content-w': `${props.minContentWidth}px`,
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${props.minColWidth}px, 1fr))`,
  gap: 'var(--btc-row-gap)',
} as Record<string, string>));

let ro: ResizeObserver | null = null;
let mo: MutationObserver | null = null;

function measure() {
  if (!rowRef.value) return;
  if (props.labelMode === 'fixed') {
    currentLabelWidth.value = props.labelWidth;
    return;
  }
  // 选择器：对齐 Element Plus �?label
  const labels = rowRef.value.querySelectorAll<HTMLElement>('.el-form-item__label');
  let max = 0;
  labels.forEach(lab => {
    // 取实际渲染宽度（包含 padding�?    const w = Math.ceil(lab.getBoundingClientRect().width);
    if (w > max) max = w;
  });
  // 减少冗余，让间距更紧凑，只在必要时给少量缓冲
  currentLabelWidth.value = Math.max(max + 2, props.labelWidth); // 只给 2px 缓冲
}

onMounted(async () => {
  await nextTick();
  measure();

  // 窗口变化 & 内容变化时重�?  ro = new ResizeObserver(() => measure());
  ro.observe(document.documentElement);

  if (rowRef.value) {
    mo = new MutationObserver(() => measure());
    mo.observe(rowRef.value, { childList: true, subtree: true });
  }
});

onBeforeUnmount(() => {
  ro?.disconnect();
  ro = null;
  mo?.disconnect();
  mo = null;
});

// 外部 props 变更也要重测
watch(() => [props.labelMode, props.labelWidth, props.minColWidth], () => {
  nextTick().then(measure);
});
</script>

<style scoped>
.btc-form-row {
  /* 水平居中 */
  margin-left: auto;
  margin-right: auto;
}

.btc-form-row :deep(.el-form-item) {
  /* �?form-item 自己别撑开 grid */
  width: 100%;
  margin-bottom: 0; /* 移除 el-form-item 的默�?margin-bottom，由外层控制 */
  /* 确保表单项垂直对�?*/
  display: flex;
  align-items: center;
}

.btc-form-row :deep(.el-form-item__label) {
  /* 强制同一�?label 宽度一�?*/
  width: var(--btc-label-width) !important;
  /* 关键：label 左对齐，覆盖 Element Plus 的右对齐 */
  text-align: left !important;
  justify-content: flex-start !important;
  padding-left: 0 !important;
  padding-right: 6px !important;
  /* 防止超长 label 破坏布局 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  /* 确保 label 垂直居中 */
  display: flex;
  align-items: center;
  height: 32px; /* 与输入框高度保持一�?*/
}

/* 内容区必须可伸缩，撑满剩余空�?*/
.btc-form-row :deep(.el-form-item__content) {
  min-width: var(--btc-min-content-w);
  display: flex;
  align-items: center;
}

/* 让常见控件拉满内容区（可按需扩展选择器） */
.btc-form-row :deep(.el-form-item__content > .el-input,
                    .el-form-item__content > .el-select,
                    .el-form-item__content > .el-date-editor,
                    .el-form-item__content > .el-cascader,
                    .el-form-item__content > .el-autocomplete,
                    .el-form-item__content > .el-slider,
                    .el-form-item__content > .el-switch,
                    .el-form-item__content > .el-input-number,
                    .el-form-item__content > .el-tree-select) {
  width: 100%;
}

/* 校验消息换行也不会把布局挤爆 */
.btc-form-row :deep(.el-form-item__error) {
  white-space: normal;
}
</style>
