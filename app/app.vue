<script setup lang="ts">
import {
  NConfigProvider,
  NGlobalStyle,
  darkTheme,
  dateEnUS,
  dateZhCN,
  enUS,
  lightTheme,
  zhCN,
} from 'naive-ui'

const colorMode = useColorMode()
const theme = computed(() => (colorMode.value === 'dark' ? darkTheme : lightTheme))

// Naive UI's own strings and date formats follow the selected locale.
const { locale } = useI18n()
const naiveLocale = computed(() => (locale.value === 'zh' ? zhCN : enUS))
const naiveDateLocale = computed(() => (locale.value === 'zh' ? dateZhCN : dateEnUS))

useHead({ htmlAttrs: { lang: () => (locale.value === 'zh' ? 'zh-CN' : 'en') } })
</script>

<template>
  <NConfigProvider :theme="theme" :locale="naiveLocale" :date-locale="naiveDateLocale">
    <NGlobalStyle />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </NConfigProvider>
</template>
