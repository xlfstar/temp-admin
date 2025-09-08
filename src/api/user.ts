import request from '@/utils/request'
import type { UserResponseType, UserLoginType } from '@/types/user'
import type { ResponseData } from '@/utils/request'

export const sigIn = (body: UserLoginType): Promise<ResponseData<UserResponseType>> => {
  return request.post('/auth/login', body)
}
