import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import { useBase } from '/$/base';
import { request } from '/@/btc/service/request';
import {
  createIdentityForm,
  createIdentityRules,
  createIdentityVerifier,
  createRegisterForm,
  createRegisterRules,
  createRegisterSmsSender,
  createFieldDisabled,
  createRegisterHandler,
  createRegistrationSteps,
  createStepDescriptions,
  createRegistrationStepState,
  fillEmployeeInfo,
  createInertRegistrationStepValidator,
  useStepValidation,
  type EmployeeInfo
} from './utils';
import { createITLRegistrationSteps, createITLStepDescriptions } from './utils/steps';

export function useInertRegistration() {
  const { app } = useBase();
  const { t } = useI18n();

  // 步骤配置 - ITL简化为两步
  const stepList = ref(createITLRegistrationSteps());
  const stepDescriptions = ref(createITLStepDescriptions());

  // 步骤状态管理 - ITL简化为两步
  const {
    currentStep,
    nextStep,
    prevStep,
    setStep,
    resetStep,
    registrationStatus,
    setRegistrationStatus,
  } = createRegistrationStepState(2);

  // 步骤验证器
  const stepValidator = createInertRegistrationStepValidator();
  const { validateCurrentStep, canProceed: canProceedToNext } = useStepValidation(stepValidator);

  // 身份验证
  const { form: identityForm } = createIdentityForm();
  const identityRules = createIdentityRules();

  // 注册表单
  const { form: registerForm } = createRegisterForm();

  // 注册状态管理
  const registrationError = ref('');
  const registrationProgress = ref(0);
  const sessionId = ref('');

  const { verifying, verifyError, employeeInfo, verifyIdentity } = createIdentityVerifier(
    identityForm,
    (info: EmployeeInfo) => {
      // 身份验证成功后的回调
      sessionId.value = info.sessionId; // 保存会话ID
      fillEmployeeInfo(registerForm, info);
      authStepFormRef.value?.nextStep();
    }
  );
  const registerRules = createRegisterRules(registerForm);
  const fieldDisabled = createFieldDisabled(registerForm);

  // ITL 简化的短信发送逻辑
  const smsCountdown = ref(0);
  const sendingSms = ref(false);
  const canSendSms = ref(true);

  const sendSmsCode = async () => {
    if (!canSendSms.value || smsCountdown.value > 0 || sendingSms.value) return;

    if (!identityForm.empId) {
      ElMessage.error('请先输入企业邮箱前缀');
      return;
    }

    sendingSms.value = true;
    try {
      // 发送验证码到企业邮箱
      const email = `${identityForm.empId}@bellis-technology.cn`;
      await request({
        url: '/base/open/sendEmailCode',
        method: 'POST',
        data: {
          email: email,
          type: 'register'
        }
      });

      ElMessage.success('验证码已发送到您的企业邮箱');

      // 开始倒计时
      smsCountdown.value = 60;
      canSendSms.value = false;

      const timer = setInterval(() => {
        smsCountdown.value--;
        if (smsCountdown.value <= 0) {
          clearInterval(timer);
          canSendSms.value = true;
        }
      }, 1000);

    } catch (error: any) {
      ElMessage.error(error.message || '发送验证码失败');
    } finally {
      sendingSms.value = false;
    }
  };

  // 注册处理
  const { registering, handleRegister } = createRegisterHandler(
    registerForm,
    () => sessionId.value, // 动态获取会话ID
    () => {
      // 注册成功后的回调
      setRegistrationStatus('success');
      authStepFormRef.value?.nextStep();
    },
    (error: any) => {
      // 注册失败后的回调
      console.error('注册失败:', error);
      registrationError.value = error.msg || error.message || '注册过程中发生错误';
      setRegistrationStatus('failed');
    }
  );

  // 表单引用
  const authStepFormRef = ref();
  const identityFormRef = ref();
  const registerFormRef = ref();

  // 重试注册
  const retryRegistration = async () => {
    setRegistrationStatus('pending');
    registrationError.value = '';
    registrationProgress.value = 0;
    await handleRegister();
  };

  // 取消注册
  const cancelRegistration = () => {
    setRegistrationStatus('pending');
    registrationProgress.value = 0;
    // 返回上一步
    authStepFormRef.value?.prevStep();
  };

  // ITL 简化的步骤处理逻辑
  const canProceed = computed(() => {
    if (currentStep.value === 0) {
      // 第一步：验证企业邮箱和验证码
      return !!(identityForm.empId && identityForm.smsCode && identityForm.smsCode.length === 6);
    }
    return true; // 第二步直接通过
  });

  // 步骤处理函数
  const handleStepChange = (step: number) => {
    setStep(step);
  };

  const handleNextStep = async () => {
    if (currentStep.value === 0) {
      // 第一步：验证企业邮箱和验证码
      if (!identityForm.empId || !identityForm.smsCode) {
        ElMessage.error('请填写完整信息');
        return;
      }

      verifying.value = true;
      try {
        // 验证企业邮箱和验证码
        const email = `${identityForm.empId}@bellis-technology.cn`;
        const response = await request({
          url: '/base/open/verifyEmailCode',
          method: 'POST',
          data: {
            email: email,
            code: identityForm.smsCode,
            type: 'register'
          }
        });

        if (response.code === 0) {
          ElMessage.success('验证成功');
          nextStep(); // 进入第二步
        } else {
          ElMessage.error(response.msg || '验证失败');
        }
      } catch (error: any) {
        ElMessage.error(error.message || '验证失败');
      } finally {
        verifying.value = false;
      }
    } else if (currentStep.value === 1) {
      // 第二步：提交注册申请
      try {
        const email = `${identityForm.empId}@bellis-technology.cn`;
        await request({
          url: '/base/open/submitRegistration',
          method: 'POST',
          data: {
            email: email,
            type: 'inert'
          }
        });

        ElMessage.success('注册申请已提交，请等待管理员审核');
        nextStep();
      } catch (error: any) {
        ElMessage.error(error.message || '提交失败');
      }
    }
  };

  const handlePrevStep = () => {
    authStepFormRef.value?.prevStep();
  };

  const handleFinish = () => {
    // 完成注册后的处理
    console.log('注册完成');
  };

  return {
    // 步骤配置
    stepList,
    stepDescriptions,

    // 步骤状态
    currentStep,
    nextStep,
    prevStep,
    setStep,
    resetStep,

    // 注册状态
    registrationStatus,
    registrationError,
    registrationProgress,

    // 身份验证
    identityForm,
    identityRules,
    verifying,
    verifyError,
    employeeInfo,
    verifyIdentity,

    // 注册表单
    registerForm,
    registerRules,
    fieldDisabled,

    // 短信
    smsCountdown,
    sendingSms,
    canSendSms,
    sendSmsCode,

    // 注册处理
    registering,

    // 计算属性
    canProceed,

    // 步骤处理
    handleStepChange,
    handleNextStep,
    handlePrevStep,
    handleFinish,

    // 重试和取消
    retryRegistration,
    cancelRegistration,

    // 表单引用
    authStepFormRef,
    identityFormRef,
    registerFormRef,

    // 国际化
    t,

    // 应用信息
    app
  };
}
