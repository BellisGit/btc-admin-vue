<template>
  <div class="btc-error-page">
    <div class="btc-error-content">
      <div class="btc-error-code">403</div>
      <div class="btc-error-title">禁止访问</div>
      <div class="btc-error-description">
        抱歉，您没有权限访问此页面
      </div>
      <div class="btc-error-actions">
        <el-button type="primary" @click="goBack">返回上页</el-button>
        <el-button @click="goHome">回到首页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};

const goHome = () => {
  router.push('/');
};
</script>

<style lang="scss" scoped>
.btc-error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--el-bg-color-page);
}

.btc-error-content {
  text-align: center;
  padding: 40px;
}

.btc-error-code {
  font-size: 120px;
  font-weight: bold;
  color: var(--el-color-primary);
  line-height: 1;
  margin-bottom: 20px;
}

.btc-error-title {
  font-size: 24px;
  color: var(--el-text-color-primary);
  margin-bottom: 16px;
}

.btc-error-description {
  font-size: 16px;
  color: var(--el-text-color-regular);
  margin-bottom: 32px;
}

.btc-error-actions {
  .el-button + .el-button {
    margin-left: 16px;
  }
}
</style>
