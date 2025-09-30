<template>
	<div class="pic-captcha">
		<div class="captcha-image" @click="refresh" v-loading="loading">
			<img v-if="src" :src="src" alt="验证码" />
			<div v-else class="placeholder">点击获取验证码</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

defineOptions({
	name: 'PicCaptcha'
});

interface Props {
	modelValue?: string;
}

interface Emits {
	(e: 'update:modelValue', value: string): void;
	(e: 'change'): void;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: ''
});

const emit = defineEmits<Emits>();

const src = ref('');
const loading = ref(false);
const captchaId = ref('');

// 获取验证码
const refresh = async () => {
	loading.value = true;
	try {
		// 这里应该调用实际的验证码 API
		// const res = await service.base.sys.captcha.get();
		// src.value = res.data.captcha;
		// captchaId.value = res.data.captchaId;
		
		// 模拟验证码
		src.value = `data:image/svg+xml;base64,${btoa(`
			<svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
				<rect width="120" height="40" fill="#f0f0f0"/>
				<text x="60" y="25" text-anchor="middle" font-size="16" fill="#333">${Math.random().toString(36).substr(2, 4).toUpperCase()}</text>
			</svg>
		`)}`;
		captchaId.value = Math.random().toString(36).substr(2, 10);
		
		emit('update:modelValue', captchaId.value);
		emit('change');
	} catch (error) {
		console.error('获取验证码失败:', error);
	} finally {
		loading.value = false;
	}
};

// 监听 modelValue 变化
watch(() => props.modelValue, (newVal) => {
	if (newVal !== captchaId.value) {
		refresh();
	}
}, { immediate: true });

// 暴露刷新方法
defineExpose({
	refresh
});
</script>

<style scoped>
.pic-captcha {
	position: relative;
}

.captcha-image {
	width: 120px;
	height: 40px;
	border: 1px solid var(--el-border-color);
	border-radius: 4px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f8f8f8;
	transition: all 0.3s;
}

.captcha-image:hover {
	border-color: var(--el-color-primary);
}

.captcha-image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 4px;
}

.placeholder {
	color: var(--el-text-color-placeholder);
	font-size: 12px;
	text-align: center;
}
</style>
