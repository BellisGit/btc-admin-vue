<template>
  <div class="btc-avatar" :class="avatarClass">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      @error="handleError"
    />
    <div v-else class="btc-avatar-placeholder">
      {{ placeholder }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | number;
  shape?: 'circle' | 'square';
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  size: 'medium',
  shape: 'circle',
  placeholder: 'U'
});

const emit = defineEmits<{
  error: [event: Event];
}>();

const avatarClass = computed(() => {
  const classes = ['btc-avatar'];
  
  if (typeof props.size === 'string') {
    classes.push(`btc-avatar--${props.size}`);
  }
  
  if (props.shape === 'circle') {
    classes.push('btc-avatar--circle');
  } else {
    classes.push('btc-avatar--square');
  }
  
  return classes;
});

const avatarStyle = computed(() => {
  if (typeof props.size === 'number') {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
      lineHeight: `${props.size}px`,
      fontSize: `${props.size * 0.4}px`
    };
  }
  return {};
});

const handleError = (event: Event) => {
  emit('error', event);
};
</script>

<style lang="scss" scoped>
.btc-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--el-fill-color-light);
  color: var(--el-text-color-regular);
  font-weight: 500;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &--circle {
    border-radius: 50%;
  }
  
  &--square {
    border-radius: 4px;
  }
  
  &--small {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
  
  &--medium {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  &--large {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}

.btc-avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
