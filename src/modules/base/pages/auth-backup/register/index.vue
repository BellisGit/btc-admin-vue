<template>
	<div class="page-register">
		<div class="box">
			<div class="logo">
				<div class="icon">
					<img src="/logo.png" alt="Logo" />
				</div>

				<span>{{ app.info.name }}</span>
			</div>

			<p class="desc">{{ $t('创建您的账户') }}</p>

			<div class="form">
				<el-form label-position="top" class="form" :disabled="saving">
					<el-form-item :label="$t('用户名')">
						<el-input
							v-model="form.username"
							:placeholder="$t('请输入用户名')"
							maxlength="20"
						/>
					</el-form-item>

					<el-form-item :label="$t('邮箱地址')">
						<el-input
							v-model="form.email"
							:placeholder="$t('请输入邮箱地址')"
							type="email"
						/>
					</el-form-item>

					<el-form-item :label="$t('手机号码')">
						<el-input
							v-model="form.phone"
							:placeholder="$t('请输入手机号码')"
							maxlength="11"
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
									:disabled="countdown > 0 || !form.phone"
									@click="sendCode"
									text
									type="primary"
								>
									{{ countdown > 0 ? `${countdown}s` : $t('发送验证码') }}
								</el-button>
							</template>
						</el-input>
					</el-form-item>

					<el-form-item :label="$t('密码')">
						<el-input
							v-model="form.password"
							type="password"
							:placeholder="$t('请输入密码')"
							maxlength="20"
							show-password
						/>
					</el-form-item>

					<el-form-item :label="$t('确认密码')">
						<el-input
							v-model="form.confirmPassword"
							type="password"
							:placeholder="$t('请再次输入密码')"
							maxlength="20"
							show-password
							@keyup.enter="register"
						/>
					</el-form-item>

					<el-form-item>
						<el-checkbox v-model="form.agree">
							{{ $t('我已阅读并同意') }}
							<el-link type="primary" :underline="false">{{ $t('《用户协议》') }}</el-link>
							{{ $t('和') }}
							<el-link type="primary" :underline="false">{{ $t('《隐私政策》') }}</el-link>
						</el-checkbox>
					</el-form-item>

					<div class="op">
						<el-button type="primary" :loading="saving" @click="register">
							{{ $t('注册') }}
						</el-button>
					</div>

					<div class="back-login">
						<el-button text @click="backToLogin">
							{{ $t('已有账户？立即登录') }}
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
	name: 'Register'
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
	username: '',
	email: '',
	phone: '',
	verifyCode: '',
	password: '',
	confirmPassword: '',
	agree: false
});

// 发送验证码
const sendCode = async () => {
	if (!form.phone) {
		return ElMessage.error(t('请输入手机号码'));
	}

	if (!/^1[3-9]\d{9}$/.test(form.phone)) {
		return ElMessage.error(t('请输入有效的手机号码'));
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

// 注册
const register = async () => {
	if (!form.username) {
		return ElMessage.error(t('请输入用户名'));
	}

	if (!form.email) {
		return ElMessage.error(t('请输入邮箱地址'));
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
		return ElMessage.error(t('请输入有效的邮箱地址'));
	}

	if (!form.phone) {
		return ElMessage.error(t('请输入手机号码'));
	}

	if (!/^1[3-9]\d{9}$/.test(form.phone)) {
		return ElMessage.error(t('请输入有效的手机号码'));
	}

	if (!form.verifyCode) {
		return ElMessage.error(t('请输入验证码'));
	}

	if (!form.password) {
		return ElMessage.error(t('请输入密码'));
	}

	if (form.password.length < 6) {
		return ElMessage.error(t('密码长度不能少于6位'));
	}

	if (form.password !== form.confirmPassword) {
		return ElMessage.error(t('两次输入的密码不一致'));
	}

	if (!form.agree) {
		return ElMessage.error(t('请同意用户协议和隐私政策'));
	}

	saving.value = true;

	try {
		// 模拟注册
		await new Promise(resolve => setTimeout(resolve, 2000));
		
		ElMessage.success(t('注册成功'));
		
		// 跳转到登录页
		router.push('/auth');
	} catch (error: any) {
		ElMessage.error(error.message || t('注册失败'));
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

.page-register {
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
		padding: 20px 0;
		box-sizing: border-box;

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
			margin-bottom: 30px;
			user-select: none;
			max-width: 80%;
			text-align: center;
		}

		.form {
			width: 350px;

			:deep(.el-form) {
				.el-form-item {
					margin-bottom: 16px;
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
			margin-top: 30px;

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
	.page-register {
		.box {
			width: 100%;

			.form {
				width: 300px;
			}
		}
	}
}

@media screen and (max-height: 800px) {
	.page-register {
		.box {
			.logo {
				height: 40px;
				margin-bottom: 15px;

				span {
					font-size: 32px;
				}
			}

			.desc {
				margin-bottom: 20px;
			}

			.form {
				:deep(.el-form) {
					.el-form-item {
						margin-bottom: 12px;
					}
				}
			}
		}
	}
}
</style>
