<script setup lang="ts">
import { NSpace, NText } from 'naive-ui'
import { legalNavigation } from '~/data/navigation'

const config = useRuntimeConfig()
const year = new Date().getFullYear()
const version = config.public.appVersion as string
</script>

<template>
  <footer class="nia-footer">
    <div class="nia-footer-inner nia-footer-row">
      <span class="nia-footer-brand">
        <NText strong
          >{{ $t('site.shortName')
          }}<span class="nia-footer-domain">{{ $t('site.domain') }}</span></NText
        >
        <NText> · {{ $t('site.name') }}</NText>
      </span>
      <NSpace :size="16" align="center">
        <NText depth="3">{{ $t('footer.version', { version }) }}</NText>
        <NText depth="3">{{ $t('footer.copyright', { year }) }}</NText>
      </NSpace>
    </div>

    <div class="nia-footer-inner nia-footer-row">
      <NText depth="3">{{ $t('footer.builtWith') }}</NText>
      <NSpace :size="16" align="center">
        <NuxtLink v-for="link in legalNavigation" :key="link.key" :to="link.to">
          <NText depth="3">{{ $t(link.key) }}</NText>
        </NuxtLink>
      </NSpace>
    </div>
  </footer>
</template>

<style scoped>
.nia-footer {
  border-top: 1px solid rgba(128, 128, 128, 0.18);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.nia-footer-inner {
  max-width: var(--nia-max-width);
  width: 100%;
  margin: 0 auto;
}
.nia-footer-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  justify-content: space-between;
}
.nia-footer-domain {
  font-weight: 500;
  opacity: 0.75;
}
.nia-footer-brand {
  white-space: nowrap;
}
</style>
