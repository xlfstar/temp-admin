export type UserType = {
  id: number
  username: string
  password?: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
}
export type UserLoginType = {
  username: string
  password: string
}
export type UserResponseType = {
  accessToken: string
  expiresIn: number
  user: UserType
  tokenType: string
}
