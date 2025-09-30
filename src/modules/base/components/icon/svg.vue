<template>
  <svg
    class="btc-icon-svg"
    :class="iconClass"
    :style="iconStyle"
    aria-hidden="true"
  >
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  name: string;
  size?: number | string;
  color?: string;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  color: 'currentColor'
});

const iconClass = computed(() => {
  const classes = ['btc-icon-svg'];
  if (props.className) {
    classes.push(props.className);
  }
  return classes;
});

const iconStyle = computed(() => {
  const style: Record<string, string> = {};
  
  if (props.size) {
    const size = typeof props.size === 'number' ? `${props.size}px` : props.size;
    style.width = size;
    style.height = size;
  }
  
  if (props.color) {
    style.color = props.color;
  }
  
  return style;
});
</script>

<style lang="scss" scoped>
.btc-icon-svg {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
