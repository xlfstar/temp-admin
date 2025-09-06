import type { AxiosRequestConfig } from 'axios'

// 扩展的请求配置接口
export interface RequestConfig extends AxiosRequestConfig {
  // 自定义配置项示例
  showLoading?: boolean // 是否显示加载提示
  customError?: boolean // 是否自定义错误处理（为true时拦截器不处理错误）
  retry?: number // 重试次数
}

// 统一的响应数据结构
export interface ResponseData<T = any> {
  code: number
  message: string
  data: T
  success?: boolean // 可选的成功标志
  // 根据你的后端实际返回结构进行调整
  // timestamp?: number;
  // status?: string;
}

// 分页请求参数
export interface PageParams {
  page?: number
  pageSize?: number
  [key: string]: any
}

// 分页响应数据
export interface PageResponse<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages?: number
}

// 列表响应数据（如果后端返回的不是分页结构）
export interface ListResponse<T = any> {
  items: T[]
  count?: number
}

// 错误响应结构
export interface ErrorResponse {
  code: number
  message: string
  details?: string
  timestamp?: string
}

// 文件上传参数
export interface UploadParams {
  file: File
  fileName?: string
  folder?: string
  [key: string]: any
}

// 文件上传响应
export interface UploadResponse {
  url: string
  name: string
  size: number
  type: string
}
