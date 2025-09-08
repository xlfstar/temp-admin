// src/utils/request.ts
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import useAuthStore from '@/stores/auth'
// 定义接口返回数据的统一格式（根据你的后端约定修改）
export interface ResponseData<T = any> {
  code: number
  message: string
  data: T extends any ? T : T & any
  // 可能还有其他字段，如 success, timestamp 等
  // success: boolean;
  // timestamp: string;
}

// 扩展 AxiosRequestConfig，为我们自定义的 config 属性提供类型支持
export interface RequestConfig extends AxiosRequestConfig {
  // 是否显示全局 loading（如果需要的话）
  showLoading?: boolean
  // 其他自定义配置...
}

class Request {
  // Axios 实例
  private instance: AxiosInstance

  // 基础配置，比如 baseURL, timeout
  private readonly baseConfig: RequestConfig = {
    baseURL: import.meta.env.VITE_APP_API_BASEURL as string, // 从环境变量读取
    timeout: 10000, // 10秒超时
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }

  constructor(config?: RequestConfig) {
    // 创建实例
    this.instance = axios.create({ ...this.baseConfig, ...config })

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么
        // 1. 自动添加 token（如果有）
        const token = localStorage.getItem('access_token') // 或者从 Pinia/Vuex 中获取
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // 2. 如果需要，在这里开启全局 Loading
        // if (config.showLoading) {
        //   // 显示 Loading 组件，例如使用 Element Plus 的 ElLoading.service
        // }

        return config
      },
      (error: any) => {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse): any => {
        // 对响应数据做点什么
        // 1. 关闭全局 Loading（如果开启了）
        // 2. 根据后端约定，处理全局成功状态
        const { data } = response

        // 假设 code 为 200 代表成功（根据你的后端修改）
        if (data.code === 200) {
          return data // 直接返回后端的数据结构，这样在 then 里就能拿到 { code, message, data }
        } else {
          // 处理业务逻辑错误，比如 token 过期、权限不足等
          this.handleBusinessError(data)
          return Promise.reject(data) // 抛出错误，让 catch 能捕获到
        }
      },
      (error: any) => {
        // 对响应错误做点什么 (HTTP 状态码不在 2xx 范围内)
        // 1. 关闭全局 Loading（如果开启了）
        // 2. 处理 HTTP 错误，如 401, 403, 404, 500 等

        this.handleHttpError(error)
        return Promise.reject(error)
      }
    )
  }

  // 处理业务错误（根据后端约定自定义）
  private handleBusinessError(error: ResponseData) {
    const { code } = error
    let message = ''
    const router = useRouter()
    switch (code) {
      case 401:
        //  token 过期，跳转到登录页
        message = '未授权，请重新登录'
        router.push('/login')
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求资源不存在'
        break
      case 500:
        message = '服务器内部错误'
        break
      default:
    }
    // 可以使用 Element Plus 等UI库的消息提示组件显示错误
    ElMessage.error(error.message || message)
  }

  // 处理 HTTP 错误
  private handleHttpError(error: any) {
    let message = ''

    const router = useRouter()
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态码超出了 2xx 的范围
      switch (error.response.status) {
        case 400:
          message = '请求错误'
          break
        case 401:
          message = '未授权，请登录'
          // 清除 token 并跳转到登录页
          // localStorage.removeItem('access_token');
          useAuthStore().clearToken()
          router.push('/login')
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          message = '请求超时'
          break
        case 500:
          message = '服务器内部错误'
          break
        case 501:
          message = '服务未实现'
          break
        case 502:
          message = '网关错误'
          break
        case 503:
          message = '服务不可用'
          break
        case 504:
          message = '网关超时'
          break
        case 505:
          message = 'HTTP版本不受支持'
          break
        default:
          message = `连接错误${error.response.status}`
      }
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      message = '网络连接异常，请检查您的网络'
    } else {
      // 发送请求时出了点问题
      message = error.message
    }
    ElMessage.error(error.response.data.message || message)
  }

  // 定义核心请求方法
  public request<T = any>(config: RequestConfig): Promise<ResponseData<T>> {
    return this.instance.request(config)
  }

  // 封装 GET 方法
  public get<T = any>(url: string, params?: any, config?: RequestConfig): Promise<ResponseData<T>> {
    return this.instance.get(url, { params, ...config })
  }

  // 封装 POST 方法
  public post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ResponseData<T>> {
    return this.instance.post(url, data, config)
  }

  // 封装 PUT 方法
  public put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ResponseData<T>> {
    return this.instance.put(url, data, config)
  }

  // 封装 DELETE 方法
  public delete<T = any>(
    url: string,
    params?: any,
    config?: RequestConfig
  ): Promise<ResponseData<T>> {
    return this.instance.delete(url, { params, ...config })
  }

  // 封装 PATCH 方法
  public patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ResponseData<T>> {
    return this.instance.patch(url, data, config)
  }
}

// 导出统一配置的 request 实例
export default new Request()

// 如果需要创建多个不同配置的实例，可以按需导出类
// export { Request };
