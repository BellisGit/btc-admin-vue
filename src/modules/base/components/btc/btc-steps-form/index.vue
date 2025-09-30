<template>
  <div class="btc-steps-form">
    <!-- 步骤指示器 - 使用 btc-steps -->
    <div v-if="showSteps" class="step-indicator">
      <btc-steps
        :active="modelCurrentStep"
        :steps="modelSteps"
        show-arrow
        class="registration-steps"
      />
    </div>

    <!-- 步骤内容 -->
    <div class="step-content">
      <!-- 步骤描述插槽 -->
      <div class="step-description">
        <slot name="step-description" :currentStep="modelCurrentStep">
          <p>{{ modelStepDescriptions[modelCurrentStep] || '请完成当前步骤' }}</p>
        </slot>
      </div>

      <!-- 步骤内容插槽 -->
      <div class="step-body">
        <slot :currentStep="modelCurrentStep" :isFirstStep="isFirstStep" :isLastStep="isLastStep">
          <div class="default-step-content">
            <p>步骤 {{ modelCurrentStep + 1 }} 内容</p>
          </div>
        </slot>
      </div>

      <!-- 步骤导航按钮 -->
      <div class="step-navigation">
        <el-button
          v-if="!isFirstStep"
          @click="previousStep"
          :disabled="!canGoPrevious"
        >
          上一步
        </el-button>

        <el-button
          v-if="!isLastStep"
          type="primary"
          @click="nextStep"
          :disabled="!canGoNext"
        >
          下一步
        </el-button>

        <el-button
          v-if="isLastStep"
          type="primary"
          @click="finish"
          :disabled="!canFinish"
        >
          完成
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// 定义组件
defineOptions({
  name: 'BtcStepsForm'
});

// 接口定义
interface StepItem {
  title: string;
  description?: string;
  status?: 'wait' | 'process' | 'finish' | 'error' | 'success';
  disabled?: boolean;
}

interface Props {
  // 当前步骤索引
  currentStep?: number;
  // 步骤列表
  steps?: StepItem[];
  // 步骤描述列表
  stepDescriptions?: string[];
  // 是否显示步骤指示器
  showSteps?: boolean;
  // 是否可以进入下一步
  canGoNext?: boolean;
  // 是否可以返回上一步
  canGoPrevious?: boolean;
  // 是否可以完成
  canFinish?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  currentStep: 0,
  steps: () => [],
  stepDescriptions: () => [],
  showSteps: true,
  canGoNext: true,
  canGoPrevious: true,
  canFinish: true
});

// 事件定义
interface Emits {
  'update:currentStep': [step: number];
  'step-change': [step: number];
  'next-step': [step: number];
  'previous-step': [step: number];
  'finish': [];
}

const emit = defineEmits<Emits>();

// 响应式数据
const modelCurrentStep = ref(props.currentStep);

// 计算属性
const modelSteps = computed(() => props.steps);
const modelStepDescriptions = computed(() => props.stepDescriptions);

const isFirstStep = computed(() => modelCurrentStep.value === 0);
const isLastStep = computed(() => modelCurrentStep.value === props.steps.length - 1);

// 方法
const nextStep = () => {
  if (props.canGoNext && !isLastStep.value) {
    const newStep = modelCurrentStep.value + 1;
    modelCurrentStep.value = newStep;
    emit('update:currentStep', newStep);
    emit('step-change', newStep);
    emit('next-step', newStep);
  }
};

const previousStep = () => {
  if (props.canGoPrevious && !isFirstStep.value) {
    const newStep = modelCurrentStep.value - 1;
    modelCurrentStep.value = newStep;
    emit('update:currentStep', newStep);
    emit('step-change', newStep);
    emit('previous-step', newStep);
  }
};

const finish = () => {
  if (props.canFinish) {
    emit('finish');
  }
};

// 监听 props.currentStep 变化
watch(
  () => props.currentStep,
  (newStep) => {
    modelCurrentStep.value = newStep;
  },
  { immediate: true }
);

// 暴露方法给父组件
defineExpose({
  nextStep,
  previousStep,
  finish,
  currentStep: modelCurrentStep
});
</script>

<style scoped lang="scss">
.btc-steps-form {
  width: 100%;

  .step-indicator {
    margin-bottom: 24px;

    .registration-steps {
      width: 100%;
    }
  }

  .step-content {
    .step-description {
      margin-bottom: 16px;

      p {
        font-size: 14px;
        color: var(--el-text-color-regular);
        line-height: 1.5;
      }
    }

    .step-body {
      margin-bottom: 24px;
      min-height: 200px;

      .default-step-content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;
        background-color: var(--el-fill-color-lighter);
        border-radius: var(--el-border-radius-base);

        p {
          color: var(--el-text-color-secondary);
          font-size: 16px;
        }
      }
    }

    .step-navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid var(--el-border-color-light);

      .el-button {
        min-width: 100px;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .btc-steps-form {
    .step-content {
      .step-navigation {
        flex-direction: column;
        gap: 12px;

        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
