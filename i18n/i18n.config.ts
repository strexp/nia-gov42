// I18n messages, bundled eagerly so locale switching is instant and the static
// build needs no runtime fetch. All UI copy is referenced through these keys.
import en from './locales/en.json'
import zh from './locales/zh.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, zh },
}))
