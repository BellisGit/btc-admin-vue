<template>
	<div class="btc-error-404">
		<div class="error-content">
			<h1>404</h1>
			<p>页面不存在</p>
			<el-button type="primary" @click="goHome">返回首页</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
	router.push('/');
};
</script>

<style scoped>
.btc-error-404 {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: #f5f5f5;
}

.error-content {
	text-align: center;
}

.error-content h1 {
	font-size: 72px;
	color: #409eff;
	margin: 0;
}

.error-content p {
	font-size: 18px;
	color: #666;
	margin: 20px 0;
}
</style>
