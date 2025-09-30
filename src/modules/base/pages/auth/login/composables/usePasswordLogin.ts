import { ref, reactive, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { useBtc } from '/@/btc';
import { useBase } from '/$/base';
import { passwordLogin } from '../../shared/composables/api';

export function usePasswordLogin() {
  const { router } = useBtc();
  const { user, menu } = useBase();
  const { t } = useI18n();

  // 表单数据
  const form = reactive({
    username: '',
    password: '',
    captchaId: '',
    verifyCode: ''
  });

  // 加载状态
  const loading = ref(false);

  // 验证规则
  const rules = {
    username: [
      { required: true, message: t('请输入账号或者邮箱'), trigger: 'blur' }
    ],
    password: [
      { required: true, message: t('请输入密码'), trigger: 'blur' }
    ]
  };

  // 提交登录
  const submit = async () => {
    try {
      loading.value = true;

      // 调用登录接口
      const response = await passwordLogin(form);

      if (response.code === 2000) {
        ElMessage.success(t('登录成功'));

        // 保存token和用户信息
        if (response.data) {
          if (response.data.token) {
            // 使用用户状态管理的setToken方法
            user.setToken(response.data.token);
          }
          if (response.data.user) {
            user.setInfo(response.data.user);
          }
        }

        // 触发 hasToken 事件
        const { app } = useBase();
        await Promise.all(app.events.hasToken.map(e => e()));

        // 使用nextTick确保状态更新后再跳转
        await nextTick();
        router.push('/');
      } else {
        ElMessage.error(response.msg || t('登录失败'));
      }
    } catch (error: any) {
      console.error('登录错误:', error);
      ElMessage.error(error.message || t('登录失败'));
    } finally {
      loading.value = false;
    }
  };

  return {
    form,
    loading,
    rules,
    submit
  };
}
