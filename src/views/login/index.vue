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

          <form
            class="login-form"
            @submit.prevent="handleLogin"
          >
            <div class="form-group">
              <label for="username">用户名</label>
              <div class="input-wrapper">
                <svg
                  class="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 21V19C20 17.9 19.1 17 18 17H6C4.9 17 4 17.9 4 19V21"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  id="username"
                  v-model="loginForm.username"
                  placeholder="请输入用户名"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="password">密码</label>
              <div class="input-wrapper">
                <svg
                  class="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 11V7C7 5.67 7.67 4.33 9 4.33C10.33 4.33 12 5.67 12 7V11"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="loginForm.password"
                  placeholder="请输入密码"
                  required
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                >
                  <svg
                    v-if="showPassword"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.94 17.94C16.2 19.57 13.09 21 12 21C7.03 21 1 16.5 1 12C1 10.9 3.18 8.43 6.06 6.06M9.9 4.24C10.59 4.09 11.3 4 12 4C16.97 4 23 8.5 23 12C23 13.78 21.22 15.47 18.94 16.74"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1 1L23 23"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg
                    v-else
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="form-options">
              <label class="checkbox-wrapper">
                <input
                  type="checkbox"
                  v-model="rememberMe"
                />
                <span class="checkmark"></span>
                记住我
              </label>
              <a
                href="#"
                class="forgot-password"
              >
                忘记密码？
              </a>
            </div>

            <button
              type="submit"
              class="login-btn"
              :disabled="loading"
            >
              <span
                v-if="loading"
                class="loading-spinner"
              ></span>
              {{ loading ? '登录中...' : '登录' }}
            </button>
          </form>

          <div class="divider">
            <span>或者</span>
          </div>

          <div class="social-login">
            <button class="social-btn github">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 0.5C5.37 0.5 0 5.87 0 12.5C0 17.75 3.44 22.2 8.2 23.75C8.8 23.87 9 23.5 9 23.16V21.26C5.65 22.02 4.97 19.85 4.97 19.85C4.42 18.53 3.63 18.17 3.63 18.17C2.54 17.4 3.72 17.42 3.72 17.42C4.92 17.5 5.54 18.68 5.54 18.68C6.62 20.54 8.36 20 9.05 19.68C9.16 18.9 9.48 18.36 9.84 18.05C7.17 17.74 4.38 16.69 4.38 12.14C4.38 10.89 4.85 9.87 5.56 9.08C5.44 8.77 5.01 7.52 5.68 5.86C5.68 5.86 6.71 5.52 9 7.02C9.96 6.75 10.98 6.62 12 6.61C13.02 6.62 14.04 6.75 15 7.02C17.29 5.52 18.32 5.86 18.32 5.86C18.99 7.52 18.56 8.77 18.44 9.08C19.15 9.87 19.62 10.89 19.62 12.14C19.62 16.7 16.82 17.74 14.14 18.05C14.58 18.42 14.98 19.15 14.98 20.26V23.16C14.98 23.5 15.18 23.87 15.78 23.75C20.56 22.2 24 17.75 24 12.5C24 5.87 18.63 0.5 12 0.5Z"
                />
              </svg>
              GitHub
            </button>
            <button class="social-btn google">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.84 16.81 15.62 17.56V20.33H19.18C21.38 18.25 22.56 15.53 22.56 12.25Z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23C15.24 23 17.95 21.92 19.18 20.33L15.62 17.56C14.61 18.22 13.34 18.63 12 18.63C8.88 18.63 6.22 16.53 5.32 13.66H1.64V16.51C2.86 18.94 7.22 23 12 23Z"
                  fill="#34A853"
                />
                <path
                  d="M5.32 13.66C5.1 13 5.1 12.13 5.32 11.34V8.49H1.64C0.6 10.56 0.6 13.44 1.64 15.51L5.32 13.66Z"
                  fill="#FBBC04"
                />
                <path
                  d="M12 5.38C13.44 5.38 14.77 5.91 15.8 6.89L18.96 3.73C17.95 2.81 15.24 1 12 1C7.22 1 2.86 5.06 1.64 7.49L5.32 10.34C6.22 7.47 8.88 5.38 12 5.38Z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const loginForm = ref({
    username: '',
    password: ''
  })

  const showPassword = ref(false)
  const rememberMe = ref(false)
  const loading = ref(false)

  const handleLogin = async () => {
    loading.value = true
    try {
      // 这里添加登录逻辑
      console.log('登录信息:', loginForm.value)
      // 模拟登录延迟
      await new Promise((resolve) => setTimeout(resolve, 2000))
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
