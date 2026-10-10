<script setup lang="ts">
import {
  NButton,
  NConfigProvider,
  NGlobalStyle,
  NIcon,
  NResult,
  darkTheme,
  dateEnUS,
  dateZhCN,
  enUS,
  lightTheme,
  zhCN,
} from 'naive-ui'
import { ArrowLeft } from '@lucide/vue'
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t, locale } = useI18n()
const colorMode = useColorMode()
const theme = computed(() => (colorMode.value === 'dark' ? darkTheme : lightTheme))
const naiveLocale = computed(() => (locale.value === 'zh' ? zhCN : enUS))
const naiveDateLocale = computed(() => (locale.value === 'zh' ? dateZhCN : dateEnUS))

const isNotFound = computed(() => props.error?.statusCode === 404)
const status = computed(() => (isNotFound.value ? '404' : 'error'))
const title = computed(() => (isNotFound.value ? t('common.notFound') : t('common.errorGeneric')))
const description = computed(() =>
  isNotFound.value ? t('common.notFoundDescription') : t('common.errorGenericDescription'),
)

function goHome(): void {
  void clearError({ redirect: '/' })
}
</script>

<template>
  <NConfigProvider :theme="theme" :locale="naiveLocale" :date-locale="naiveDateLocale">
    <NGlobalStyle />
    <div class="nia-shell">
      <a class="nia-skip-link" href="#nia-main">{{ $t('common.skipToContent') }}</a>
      <AppHeader />
      <main id="nia-main" class="nia-main" tabindex="-1">
        <div class="nia-page">
          <NResult :status="status" :title="title" :description="description">
            <template #footer>
              <NButton type="primary" @click="goHome">
                <template #icon>
                  <NIcon><ArrowLeft /></NIcon>
                </template>
                {{ t('common.backToHome') }}
              </NButton>
            </template>
          </NResult>
        </div>
      </main>
      <AppFooter />
    </div>
  </NConfigProvider>
</template>
