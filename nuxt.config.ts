// Nuxt configuration for the National Immigration Agency (NIA) portal.
//
// The portal is a statically generated single-page application built with
// Naive UI, in the same style as the ePass 42 service. It makes no third-party
// runtime requests so that it keeps working inside dn42 without access to the
// public internet.
export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: false },

  // Client-rendered SPA (Naive UI needs no SSR plumbing, and every route is
  // served by the SPA shell through the static host's fallback).
  ssr: false,

  modules: ['@nuxtjs/i18n', '@nuxtjs/color-mode', '@nuxtjs/sitemap', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      appVersion: process.env.npm_package_version ?? '0.1.0',
    },
  },

  // Register components by file name (no directory prefix) so `<AppHeader>`
  // resolves regardless of its folder.
  components: [{ path: '~/components', pathPrefix: false }],

  site: {
    url: 'https://nia.gov.dn42',
    name: 'National Immigration Agency',
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    restructureDir: 'i18n',
    locales: [
      { code: 'en', language: 'en', name: 'English' },
      { code: 'zh', language: 'zh-CN', name: '中文' },
    ],
    // Messages are bundled through `i18n.config.ts`; locale selection and
    // persistence are handled in plugins/i18n-locale.client.ts.
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nia-gov42-color-mode',
  },

  // Naive UI ships untranspiled ES modules that Vite must process.
  build: {
    transpile: ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer'],
  },

  nitro: {
    preset: 'static',
  },

  typescript: {
    strict: true,
  },

  app: {
    head: {
      titleTemplate: '%s · National Immigration Agency',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#1b3a6b' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
})
