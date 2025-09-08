import { createI18n, type I18n } from 'vue-i18n'
import en from './lang/en.json'
import zhCN from './lang/zh-CN.json'

const messages = {
  en,
  'zh-CN': zhCN
}
// 创建i18n实例
const i18n: I18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'en', // 回退语言
  messages // 语言包
})

export default i18n
