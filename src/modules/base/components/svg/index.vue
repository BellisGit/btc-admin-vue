<template>
	<svg :class="svgClass" :style="style" aria-hidden="true">
		<use :xlink:href="iconName" />
	</svg>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'btc-svg'
});

import { computed, reactive } from 'vue';
import { parsePx } from '/@/btc/utils';

const props = defineProps({
	name: String,
	className: String,
	color: String,
	size: [String, Number]
});

const style = reactive({
	fontSize: parsePx(props.size!),
	fill: props.color
});

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
	return ['btc-svg', `btc-svg__${props.name}`, String(props.className || '')];
});
</script>

<style lang="scss" scoped>
.btc-svg {
	display: inline-block;
	width: 1em;
	height: 1em;
	fill: currentColor;
	overflow: hidden;
}
</style>
