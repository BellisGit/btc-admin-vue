/**
 * Auth 认证服务
 * 统一的认证 API 调用层
 * 
 * @module authService
 * @description 提供所有认证相关的 API 调用，包括登录、注册、忘记密码等
 */

import { request } from '/@/btc/service/request';
import { storage } from '/@/btc/utils';
import type { ApiResponse } from '/@/btc/service/request';
import { ElMessage } from 'element-plus';

// ==================== 类型定义 ====================

export interface LoginRequest {
  username: string;
  password: string;
  captchaId?: string;
  verifyCode?: string;
}

export interface SmsLoginRequest {
  phone: string;
  smsCode: string;
}

export interface RegisterRequest {
  tenantType: string;
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  companyName?: string;
  [key: string]: any;
}

export interface ForgotPasswordRequest {
  phone: string;
  smsCode: string;
  newPassword: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  avatar?: string;
  roles?: string[];
  permissions?: string[];
  tenantId?: string;
  tenantType?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
}

export interface TokenInfo {
  token: string;
  refreshToken: string;
  expire: number;
  refreshExpire: number;
}

// ==================== 错误处理 ====================

/**
 * API 错误包装器
 * 统一处理 API 调用错误
 */
async function handleApiCall<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  errorMessage?: string
): Promise<ApiResponse<T>> {
  try {
    const response = await apiCall();
    
    // 检查响应状态
    if (response.code !== 2000) {
      const message = response.msg || errorMessage || 'API 调用失败';
      console.error(`[AuthService] ${message}:`, response);
      // 对于业务错误，直接抛出错误让调用方处理
      throw new Error(message);
    }
    
    return response;
  } catch (error: any) {
    const message = errorMessage || 'API 调用异常';
    console.error(`[AuthService] ${message}:`, error);
    
    // 如果是网络错误或 404，提供友好的错误信息
    if (error.response?.status === 404) {
      console.warn('[AuthService] API 端点不存在，可能是后端服务未启动');
    } else if (!error.response) {
      console.warn('[AuthService] 网络连接失败，请检查网络或后端服务');
    }
    
    throw error;
  }
}

// ==================== 服务类 ====================

export class AuthService {
  private apiPrefix = '/admin/base/open';

  /**
   * 账号密码登录
   */
  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return handleApiCall(
      () => request.post<AuthResponse>(`${this.apiPrefix}/login`, data),
      '账号密码登录失败'
    );
  }

  /**
   * 短信验证码登录
   */
  async smsLogin(data: SmsLoginRequest): Promise<ApiResponse<AuthResponse>> {
    return handleApiCall(
      () => request.post<AuthResponse>(`${this.apiPrefix}/sms-login`, data),
      '短信登录失败'
    );
  }

  /**
   * 用户注册
   */
  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return handleApiCall(
      () => request.post<AuthResponse>(`${this.apiPrefix}/register`, data),
      '用户注册失败'
    );
  }

  /**
   * 忘记密码（重置密码）
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<any>> {
    return handleApiCall(
      () => request.post(`${this.apiPrefix}/forgot-password`, data),
      '密码重置失败'
    );
  }

  /**
   * 发送短信验证码
   */
  async sendSmsCode(phone: string, type: 'login' | 'register' | 'forgot'): Promise<ApiResponse<any>> {
    return handleApiCall(
      () => request.post(`${this.apiPrefix}/sms-code`, { phone, type }),
      '发送短信验证码失败'
    );
  }

  /**
   * 刷新二维码
   */
  async refreshQrCode(): Promise<ApiResponse<{ qrCodeUrl: string; qrCodeId: string }>> {
    return handleApiCall(
      () => request.get(`${this.apiPrefix}/qr-code`),
      '刷新二维码失败'
    );
  }

  /**
   * 检查二维码登录状态
   */
  async checkQrCodeStatus(qrCodeId: string): Promise<ApiResponse<AuthResponse | null>> {
    return handleApiCall(
      () => request.get(`${this.apiPrefix}/qr-code/status`, { params: { qrCodeId } }),
      '检查二维码状态失败'
    );
  }

  /**
   * 验证身份（BTC员工注册时）
   */
  async verifyIdentity(data: { employeeId: string; name: string }): Promise<ApiResponse<any>> {
    return handleApiCall(
      () => request.post(`${this.apiPrefix}/verify-identity`, data),
      '身份验证失败'
    );
  }

  /**
   * 登出
   */
  async logout(): Promise<ApiResponse<any>> {
    const token = storage.get('token');
    if (!token) {
      return Promise.resolve({ code: 1000, data: null, msg: 'success' });
    }
    
    return handleApiCall(
      () => request.post(`${this.apiPrefix}/logout`),
      '登出失败'
    );
  }

  /**
   * 刷新令牌
   */
  async refreshToken(): Promise<ApiResponse<{ token: string; expiresIn: number }>> {
    const refreshToken = storage.get('refreshToken');
    if (!refreshToken) {
      return Promise.reject(new Error('No refresh token available'));
    }

    return handleApiCall(
      () => request.post(`${this.apiPrefix}/refresh-token`, { refreshToken }),
      '刷新令牌失败'
    );
  }

  /**
   * 获取用户信息
   */
  async getUserInfo(): Promise<ApiResponse<AuthUser>> {
    return handleApiCall(
      () => request.get('/admin/base/comm/person'),
      '获取用户信息失败'
    );
  }

  /**
   * 获取验证码图片
   */
  async getCaptcha(): Promise<ApiResponse<{ captchaId: string; captchaImage: string }>> {
    return handleApiCall(
      () => request.get(`${this.apiPrefix}/captcha`),
      '获取验证码失败'
    );
  }

  /**
   * 验证验证码
   */
  async verifyCaptcha(captchaId: string, verifyCode: string): Promise<ApiResponse<boolean>> {
    return handleApiCall(
      () => request.post(`${this.apiPrefix}/verify-captcha`, { captchaId, verifyCode }),
      '验证码验证失败'
    );
  }
}

// 导出单例
export const authService = new AuthService();

// 默认导出
export default authService;
