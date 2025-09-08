import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { sigIn } from '@/api/user'
import type { UserType, UserLoginType } from '@/types/user'
const useAuthStore = defineStore(
  'auth',
  () => {
    const isLogin = ref<boolean>(false)
    const userInfo = ref<UserType | null>(null)
    const token = ref<string | null>(null)
    async function login(body: UserLoginType) {
      try {
        const { code, message, data } = await sigIn(body)

        // const { user, accessToken, expiresIn } = res
        isLogin.value = true
        userInfo.value = data.user
        token.value = data.accessToken
        return { code, message, data }
      } catch (err) {
        isLogin.value = false
        userInfo.value = null
        token.value = null
        return err
      }
    }

    function clearToken() {
      isLogin.value = false
      userInfo.value = null
      token.value = null
    }
    return { login, clearToken, isLogin, userInfo, token }
  },
  {
    persist: true
  }
)
export default useAuthStore
