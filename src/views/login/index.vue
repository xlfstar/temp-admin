<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-left">
        <div class="brand-section">
          <div class="logo">
            <div class="logo-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span class="logo-text">Admin Panel</span>
          </div>
          <p class="brand-slogan">现代化后台管理系统</p>
        </div>
        <div class="illustration">
          <div class="geometric-shape shape-1"></div>
          <div class="geometric-shape shape-2"></div>
          <div class="geometric-shape shape-3"></div>
        </div>
      </div>

      <div class="login-right">
        <div class="login-form-container">
          <div class="form-header">
            <h2>欢迎回来</h2>
            <p>请登录您的账户</p>
          </div>

          <el-form
            class="login-form"
            ref="loginFormRef"
            :model="loginForm"
          >
            <el-form-item
              prop="username"
              label=""
              size="large"
            >
              <el-input
                type="text"
                v-model="loginForm.username"
                placeholder="请输入用户名"
                clearable
                size="large"
              >
                <template #prefix>
                  <icon-font name="icon-yonghu" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              label=""
            >
              <el-input
                type="password"
                v-model="loginForm.password"
                placeholder="请输入密码"
                size="large"
                show-password
              >
                <template #prefix>
                  <icon-font name="icon-lock" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="w-full"
                size="large"
                @click="handleLogin"
                :loading="loading"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
  import { IconFont } from '@/components'
  import { useRouter } from 'vue-router'
  import useAuthStore from '@/stores/auth'
  import type { UserLoginType } from '@/types/user'
  const router = useRouter()
  const authStore = useAuthStore()
  const loginFormRef = ref<FormInstance | null>(null)
  const loginForm = ref<UserLoginType>({
    username: '',
    password: ''
  })

  const loading = ref(false)

  const handleLogin = async () => {
    loading.value = true
    try {
      const res = await authStore.login(loginForm.value)
      console.log({ res })
      ElMessage.success('登录成功11')
      router.push('/')
    } catch (error) {
      console.error('登录失败:', error)
    } finally {
      loading.value = false
    }
  }
</script>

<style scoped>
  .login-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .login-wrapper {
    background: white;
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 900px;
    width: 100%;
    min-height: 600px;
  }

  .login-left {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .brand-section {
    text-align: center;
    color: white;
    z-index: 2;
    position: relative;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
    color: white;
  }

  .logo-text {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .brand-slogan {
    font-size: 16px;
    opacity: 0.9;
    margin: 0;
    line-height: 1.5;
  }

  .illustration {
    margin-top: 40px;
    position: relative;
    height: 200px;
  }

  .geometric-shape {
    position: absolute;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .shape-1 {
    width: 80px;
    height: 80px;
    top: 20px;
    left: 20px;
    animation: float 6s ease-in-out infinite;
  }

  .shape-2 {
    width: 120px;
    height: 120px;
    top: 60px;
    right: 30px;
    animation: float 8s ease-in-out infinite reverse;
  }

  .shape-3 {
    width: 60px;
    height: 60px;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    animation: float 7s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .login-right {
    padding: 60px 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-form-container {
    width: 100%;
    max-width: 320px;
  }

  .form-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .form-header h2 {
    font-size: 28px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;
  }

  .form-header p {
    color: #666;
    margin: 0;
    font-size: 15px;
  }

  .login-form {
    width: 100%;
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-group label {
    display: block;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    font-size: 14px;
  }

  .input-wrapper {
    position: relative;
  }

  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: #999;
    z-index: 1;
  }

  .input-wrapper input {
    width: 100%;
    padding: 16px 16px 16px 48px;
    border: 2px solid #e1e5e9;
    border-radius: 12px;
    font-size: 15px;
    transition: all 0.3s ease;
    background: #fafbfc;
    box-sizing: border-box;
  }

  .input-wrapper input:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .password-toggle {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 4px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .password-toggle:hover {
    color: #667eea;
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #555;
  }

  .checkbox-wrapper input[type='checkbox'] {
    display: none;
  }

  .checkmark {
    width: 18px;
    height: 18px;
    border: 2px solid #ddd;
    border-radius: 4px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .checkbox-wrapper input[type='checkbox']:checked + .checkmark {
    background: #667eea;
    border-color: #667eea;
  }

  .checkbox-wrapper input[type='checkbox']:checked + .checkmark::after {
    content: '✓';
    color: white;
    font-size: 12px;
    font-weight: bold;
  }

  .forgot-password {
    color: #667eea;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
  }

  .forgot-password:hover {
    text-decoration: underline;
  }

  .login-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .login-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  .login-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .divider {
    text-align: center;
    margin: 32px 0;
    position: relative;
    color: #999;
    font-size: 14px;
  }

  .divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e1e5e9;
    z-index: 0;
  }

  .divider span {
    background: white;
    padding: 0 16px;
    position: relative;
    z-index: 1;
  }

  .social-login {
    display: flex;
    gap: 12px;
  }

  .social-btn {
    flex: 1;
    padding: 12px;
    border: 2px solid #e1e5e9;
    background: white;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
  }

  .social-btn svg {
    width: 18px;
    height: 18px;
  }

  .social-btn:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }

  .social-btn.github {
    color: #333;
  }

  .social-btn.google {
    color: #4285f4;
  }

  @media (max-width: 768px) {
    .login-wrapper {
      grid-template-columns: 1fr;
      max-width: 400px;
    }

    .login-left {
      display: none;
    }

    .login-right {
      padding: 40px 30px;
    }

    .login-form-container {
      max-width: none;
    }
  }
</style>
