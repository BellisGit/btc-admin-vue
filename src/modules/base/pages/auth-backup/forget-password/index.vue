<template>
	<div class="page-forget-password">
		<div class="box">
			<div class="logo">
				<div class="icon">
					<img src="/logo.png" alt="Logo" />
				</div>

				<span>{{ app.info.name }}</span>
			</div>

			<p class="desc">{{ $t('重置您的账户密码') }}</p>

			<div class="form">
				<el-form label-position="top" class="form" :disabled="saving">
					<el-form-item :label="$t('邮箱地址')">
						<el-input
							v-model="form.email"
							:placeholder="$t('请输入注册邮箱')"
							type="email"
						/>
					</el-form-item>

					<el-form-item :label="$t('验证码')">
						<el-input
							v-model="form.verifyCode"
							:placeholder="$t('请输入验证码')"
							maxlength="6"
						>
							<template #suffix>
								<el-button 
									:disabled="countdown > 0 || !form.email"
									@click="sendCode"
									text
									type="primary"
								>
									{{ countdown > 0 ? `${countdown}s` : $t('发送验证码') }}
								</el-button>
							</template>
						</el-input>
					</el-form-item>

					<el-form-item :label="$t('新密码')">
						<el-input
							v-model="form.password"
							type="password"
							:placeholder="$t('请输入新密码')"
							maxlength="20"
							show-password
						/>
					</el-form-item>

					<el-form-item :label="$t('确认密码')">
						<el-input
							v-model="form.confirmPassword"
							type="password"
							:placeholder="$t('请再次输入新密码')"
							maxlength="20"
							show-password
							@keyup.enter="resetPassword"
						/>
					</el-form-item>

					<div class="op">
						<el-button type="primary" :loading="saving" @click="resetPassword">
							{{ $t('重置密码') }}
						</el-button>
					</div>

					<div class="back-login">
						<el-button text @click="backToLogin">
							{{ $t('返回登录') }}
						</el-button>
					</div>
				</el-form>
			</div>
		</div>

		<div class="bg">
			<btc-svg name="bg"></btc-svg>
		</div>

		<a href="https://cool-js.com" class="copyright"> Copyright © COOL </a>
	</div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'ForgetPassword'
});

import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useBase } from '/$/base';
import { useI18n } from 'vue-i18n';

const { app } = useBase();
const { t } = useI18n();
const router = useRouter();

// 状态
const saving = ref(false);
const countdown = ref(0);

// 表单数据
const form = reactive({
	email: '',
	verifyCode: '',
	password: '',
	confirmPassword: ''
});

// 发送验证码
const sendCode = async () => {
	if (!form.email) {
		return ElMessage.error(t('请输入邮箱地址'));
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
		return ElMessage.error(t('请输入有效的邮箱地址'));
	}

	try {
		// 模拟发送验证码
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		ElMessage.success(t('验证码已发送'));
		
		// 开始倒计时
		countdown.value = 60;
		const timer = setInterval(() => {
			countdown.value--;
			if (countdown.value <= 0) {
				clearInterval(timer);
			}
		}, 1000);
	} catch (error: any) {
		ElMessage.error(error.message || t('发送失败'));
	}
};

// 重置密码
const resetPassword = async () => {
	if (!form.email) {
		return ElMessage.error(t('请输入邮箱地址'));
	}

	if (!form.verifyCode) {
		return ElMessage.error(t('请输入验证码'));
	}

	if (!form.password) {
		return ElMessage.error(t('请输入新密码'));
	}

	if (form.password.length < 6) {
		return ElMessage.error(t('密码长度不能少于6位'));
	}

	if (form.password !== form.confirmPassword) {
		return ElMessage.error(t('两次输入的密码不一致'));
	}

	saving.value = true;

	try {
		// 模拟重置密码
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		ElMessage.success(t('密码重置成功'));
		
		// 跳转到登录页
		router.push('/login');
	} catch (error: any) {
		ElMessage.error(error.message || t('重置失败'));
	} finally {
		saving.value = false;
	}
};

// 返回登录页
const backToLogin = () => {
	router.push('/login');
};
</script>

<style lang="scss" scoped>
$color: #2c3142;

.page-forget-password {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	position: relative;
	background-color: #fff;
	color: $color;

	.bg {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 90%;
		pointer-events: none;
		transform: rotate(180deg) scaleY(-1);

		.btc-svg {
			height: 100%;
			width: 100%;
		}
	}

	.copyright {
		position: absolute;
		bottom: 15px;
		left: 0;
		text-align: center;
		width: 100%;
		color: var(--el-color-info);
		font-size: 14px;
		user-select: none;
	}

	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 50%;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 9;

		.logo {
			height: 50px;
			margin-bottom: 20px;
			display: flex;
			align-items: center;
			user-select: none;

			.icon {
				border-radius: 8px;
				padding: 5px;
				margin-right: 10px;
				background-color: $color;

				img {
					height: 36px;
				}
			}

			span {
				font-size: 38px;
				font-weight: bold;
				line-height: 1;
				letter-spacing: 3px;
			}
		}

		.desc {
			font-size: 15px;
			letter-spacing: 1px;
			margin-bottom: 50px;
			user-select: none;
			max-width: 80%;
			text-align: center;
		}

		.form {
			width: 350px;

			:deep(.el-form) {
				.el-form-item {
					margin-bottom: 20px;
				}

				.el-form-item__label {
					color: var(--el-color-info);
					padding-left: 5px;
					user-select: none;
				}

				.el-input {
					box-sizing: border-box;
					font-size: 15px;
					border: 0;
					border-radius: 0;
					background-color: #f8f8f8;
					padding: 0 5px;
					border-radius: 8px;
					position: relative;

					&__wrapper {
						box-shadow: none;
						background-color: transparent;
					}

					&__inner {
						height: 45px;
						color: #333;
					}

					&:-webkit-autofill {
						-webkit-box-shadow: 0 0 0 1000px #f8f8f8 inset;
						box-shadow: 0 0 0 1000px #f8f8f8 inset;
					}
				}
			}
		}

		.op {
			display: flex;
			justify-content: center;
			margin-top: 40px;

			:deep(.el-button) {
				height: 45px;
				width: 100%;
				font-size: 16px;
				border-radius: 8px;
				letter-spacing: 1px;
			}
		}

		.back-login {
			display: flex;
			justify-content: center;
			margin-top: 20px;

			:deep(.el-button) {
				font-size: 14px;
			}
		}
	}
}

@media screen and (max-width: 1024px) {
	.page-forget-password {
		.box {
			width: 100%;

			.form {
				width: 300px;
			}
		}
	}
}
</style>
