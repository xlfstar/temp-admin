/**
 * request.get(url,options)
 * @param url
 * @param options ==> {body,query,params}
 */
import axios, { type AxiosResponse, type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig, ResponseData } from '@/types/request'
import { compile } from 'path-to-regexp'
import { API_URL } from './config'
import { ElMessage } from 'element-plus'
// import { getToken } from '../utils/helper'

// const instance = axios.create({
//   baseURL: API_URL,
//   timeout: 30000
// })
const instance = axios.create({
  baseURL: API_URL, // 从环境变量读取
  timeout: 10000, // 超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token') // 或者从 pinia/vuex 获取
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 可以在这里添加加载提示
    // if (config.showLoading) {
    //   showLoading();
    // }

    return config
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    // 隐藏加载提示
    // hideLoading();

    const { data } = response
    console.log('---response', response)

    // 根据你的业务逻辑处理响应
    if (data.code === 200 || data.success) {
      return data.data
    } else {
      // 业务逻辑错误
      return Promise.reject(new Error(data.message || '请求失败'))
    }
  },
  (error: AxiosError) => {
    // 对响应错误做点什么
    // hideLoading();

    // 统一错误处理
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response

      switch (status) {
        case 401:
          // token 过期，跳转到登录页
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          return Promise.reject(new Error('没有权限访问'))
        case 404:
          return Promise.reject(new Error('请求的资源不存在'))
        case 500:
          return Promise.reject(new Error('服务器内部错误'))
        default:
          return Promise.reject(new Error((data as any)?.message || '网络错误'))
      }
    } else if (error.request) {
      // 请求发送了但没有收到响应
      return Promise.reject(new Error('网络连接失败，请检查网络'))
    } else {
      // 其他错误
      return Promise.reject(new Error(error.message || '请求配置错误'))
    }

    return Promise.reject(error)
  }
)

// 添加请求拦截器

// 定义请求参数接口
interface RequestOptions {
  params?: Record<string, any>
  body?: any
  query?: Record<string, any>
  showError?: boolean
}

// 定义HTTP方法类型
type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

// 定义请求函数类型
type RequestFunction = (
  path: string,
  options?: RequestOptions,
  config?: Record<string, any>
) => Promise<any>

// 定义请求对象接口
interface RequestObject extends Record<HttpMethod, RequestFunction> {}

const methods: HttpMethod[] = ['get', 'post', 'put', 'patch', 'delete']
const request = {} as RequestObject

methods.forEach((method: HttpMethod) => {
  request[method] = (
    path: string,
    { params, body, query, showError = true }: RequestOptions = {},
    config: Record<string, any> = {}
  ) => {
    // console.log({path,params,query,body,config});
    const mergeUrlParams = compile(path)
    const urlMergedParams = mergeUrlParams(params)

    // 构建axios配置，排除showError
    const axiosConfig = {
      method,
      url: urlMergedParams,
      data: body,
      params: query,
      ...config
    }

    return instance(axiosConfig).catch((error) => {
      if (showError) {
        // 这里可以添加错误提示逻辑
        console.error(`Request failed for ${method.toUpperCase()} ${path}:`, error)
        // 如果需要，可以在这里调用全局错误提示组件
        // ElMessage.error(error.message)
      }
      throw error
    })
  }
})

export default request
