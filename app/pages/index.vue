<script setup lang="ts">
import { NButton, NCard, NGi, NGrid, NH1, NH2, NIcon, NP, NSpace, NText } from 'naive-ui'
import { ArrowRight, ExternalLink } from '@lucide/vue'
import { EPASS_URL } from '~/data/links'
import { notices } from '~/data/notices'
import { tasks } from '~/data/tasks'

const { t } = useI18n()

const latestNotices = notices.slice(0, 3)

usePageSeo({
  title: () => t('pages.home.title'),
  description: () => t('pages.home.description'),
})
</script>

<template>
  <div class="nia-page">
    <NSpace vertical size="large">
      <header>
        <NText depth="3" class="nia-eyebrow">{{ $t('site.official') }}</NText>
        <NH1>{{ $t('site.name') }}</NH1>
        <NP depth="2">{{ $t('site.tagline') }}</NP>
        <NSpace :size="12">
          <NButton type="primary" size="large" @click="navigateTo('/services')">
            {{ $t('home.ctaServices') }}
          </NButton>
          <NButton tag="a" size="large" :href="EPASS_URL" target="_blank" rel="noopener noreferrer">
            {{ $t('home.ctaEpass') }}
            <span class="nia-sr-only"> ({{ $t('common.opensInNewTab') }})</span>
            <template #icon>
              <NIcon><ExternalLink /></NIcon>
            </template>
          </NButton>
        </NSpace>
      </header>

      <section>
        <NH2>{{ $t('home.tasksTitle') }}</NH2>
        <NP depth="2">{{ $t('home.tasksDescription') }}</NP>
        <NGrid :cols="3" :x-gap="12" :y-gap="12" item-responsive responsive="screen">
          <NGi v-for="task in tasks" :key="task.id" span="3 s:3 m:1">
            <NuxtLink
              :to="task.to ?? task.href"
              :target="task.href ? '_blank' : undefined"
              :rel="task.href ? 'noopener noreferrer' : undefined"
              class="nia-tile"
            >
              <NCard size="small" hoverable>
                <NSpace align="center" :size="12" :wrap="false">
                  <NIcon size="20"><component :is="task.icon" /></NIcon>
                  <NText>{{ $t(task.labelKey) }}</NText>
                  <span v-if="task.href" class="nia-sr-only">
                    ({{ $t('common.opensInNewTab') }})</span
                  >
                </NSpace>
              </NCard>
            </NuxtLink>
          </NGi>
        </NGrid>
      </section>

      <section>
        <NSpace justify="space-between" align="center">
          <NH2 style="margin: 0">{{ $t('home.noticesTitle') }}</NH2>
          <NButton text type="primary" @click="navigateTo('/notices')">
            {{ $t('home.noticesAll') }}
            <template #icon>
              <NIcon><ArrowRight /></NIcon>
            </template>
          </NButton>
        </NSpace>
        <NGrid :cols="3" :x-gap="16" :y-gap="16" item-responsive responsive="screen">
          <NGi v-for="notice in latestNotices" :key="notice.id" span="3 s:3 m:1">
            <NoticeCard :notice="notice" compact />
          </NGi>
        </NGrid>
      </section>

      <section>
        <NH2>{{ $t('home.aboutTitle') }}</NH2>
        <NP depth="2">{{ $t('home.aboutDescription') }}</NP>
        <NButton secondary type="primary" @click="navigateTo('/about')">
          {{ $t('home.aboutCta') }}
          <template #icon>
            <NIcon><ArrowRight /></NIcon>
          </template>
        </NButton>
      </section>
    </NSpace>
  </div>
</template>

<style scoped>
.nia-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  font-weight: 600;
}
.nia-tile {
  display: block;
  height: 100%;
}
</style>
