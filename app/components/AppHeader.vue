<script setup lang="ts">
import { NButton, NDropdown, NIcon, NMenu, NSpace } from 'naive-ui'
import { BookUser, Languages } from '@lucide/vue'
import { computed, h } from 'vue'
import { primaryNavigation } from '~/data/navigation'

const { t, locales, setLocale } = useI18n()
const route = useRoute()

const options = computed(() =>
  primaryNavigation.map((item) => ({
    label: t(item.key),
    key: item.to,
    icon: () => h(NIcon, null, { default: () => h(item.icon as never) }),
  })),
)

/** The configured locales, for the language menu. */
const localeOptions = computed(() =>
  (locales.value as { code: string; name?: string }[]).map((item) => ({
    label: item.name ?? item.code,
    key: item.code,
  })),
)

function onLocaleSelect(key: string): void {
  void setLocale(key as 'en' | 'zh')
}

const active = computed(() => {
  const segment = route.path.split('/')[1]
  return segment ? `/${segment}` : '/'
})

function onSelect(key: string): void {
  void navigateTo(key)
}
</script>

<template>
  <header class="nia-header">
    <NuxtLink to="/" class="nia-brand">
      <NIcon size="26"><BookUser /></NIcon>
      <span class="nia-brand-text">
        <span class="nia-brand-name"
          >{{ $t('site.shortName')
          }}<span class="nia-brand-domain">{{ $t('site.domain') }}</span></span
        >
        <span class="nia-brand-authority">{{ $t('site.name') }}</span>
      </span>
    </NuxtLink>
    <nav :aria-label="$t('common.navigation')" class="nia-nav">
      <NMenu
        mode="horizontal"
        :options="options"
        :value="active"
        responsive
        class="nia-menu"
        @update:value="onSelect"
      />
    </nav>
    <NSpace class="nia-header-actions" align="center">
      <NDropdown :options="localeOptions" @select="(key) => onLocaleSelect(String(key))">
        <NButton quaternary circle :aria-label="$t('common.language')">
          <template #icon>
            <NIcon><Languages /></NIcon>
          </template>
        </NButton>
      </NDropdown>
      <ThemeToggle />
    </NSpace>
  </header>
</template>

<style scoped>
.nia-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 16px;
  padding: 8px 16px;
  min-height: 64px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.18);
}
.nia-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
}
.nia-brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}
.nia-brand-name {
  font-weight: 700;
  font-size: 18px;
}
.nia-brand-domain {
  font-weight: 500;
  opacity: 0.75;
}
.nia-brand-authority {
  font-size: 11px;
  opacity: 0.85;
  white-space: nowrap;
}
.nia-nav {
  flex: 1;
  min-width: 0;
}
.nia-menu {
  flex: 1;
  min-width: 0;
}
.nia-header-actions {
  margin-left: auto;
  flex-shrink: 0;
}

/* On narrow screens keep only the short name; the full name is long. */
@media (max-width: 520px) {
  .nia-brand-authority {
    display: none;
  }
}
</style>
