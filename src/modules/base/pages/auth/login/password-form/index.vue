<template>
  <div class="password-login">
    <!-- 登录表单 -->
    <btc-form ref="formRef" :model="form" :rules="rules" :label-width="0" class="form">
      <el-form-item prop="username">
        <el-input v-model="form.username" :placeholder="props.t('请输入用户名或邮箱')" size="large" clearable />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          type="password"
          :placeholder="props.t('请输入密码')"
          size="large"
          show-password
          @keyup.enter="handleSubmit"
        />
      </el-form-item>
    </btc-form>

    <!-- 登录按钮 -->
    <el-button type="primary" size="large" :loading="loading" @click="handleSubmit" class="login-button">
      {{ props.t('立即登录') }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { FormInstance } from 'element-plus';

defineOptions({
  name: 'PasswordLoginView'
});

interface Props {
  form: {
    username: string;
    password: string;
  };
  rules: any;
  loading: boolean;
  submit: () => void;
  t: (key: string) => string;
}

const props = defineProps<Props>();

const formRef = ref<FormInstance>();

// 包装提交函数，先验证再提交
const handleSubmit = async () => {
  if (!formRef.value) return;
  
  try {
    await formRef.value.validate();
    // 验证通过，执行提交
    props.submit();
  } catch (error) {
    // 验证失败，Element Plus 会自动显示错误信息
    // 不输出日志，避免混淆
  }
};
</script>

<style lang="scss" scoped>
.password-login {
  .form {
    .el-form-item {
      margin-bottom: 16px;
    }

    .el-input {
      width: 100%;
    }
  }

  .login-button {
    width: 100%;
    margin-top: 8px;
  }
}
</style>
