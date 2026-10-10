<script setup lang="ts">
import { NButton, NCard, NGi, NGrid, NIcon, NP, NSpace, NText } from 'naive-ui'
import { ExternalLink } from '@lucide/vue'
import { repositories } from '~/data/links'

const { t } = useI18n()

usePageSeo({
  title: () => t('pages.openSource.title'),
  description: () => t('pages.openSource.description'),
})
</script>

<template>
  <div class="nia-page">
    <PageHeader
      :title="$t('pages.openSource.title')"
      :subtitle="$t('pages.openSource.description')"
    />

    <NP depth="2">{{ $t('opensource.intro') }}</NP>

    <NGrid :cols="2" :x-gap="16" :y-gap="16" item-responsive responsive="screen">
      <NGi v-for="project in repositories" :key="project.id" span="2 s:2 m:1">
        <NCard>
          <NSpace align="center" :size="12">
            <NIcon size="28"><component :is="project.icon" /></NIcon>
            <div>
              <NText strong style="font-size: 16px">
                {{ $t(`opensource.projects.${project.id}.name`) }}
              </NText>
              <NText depth="3" style="display: block">
                {{ $t(`opensource.projects.${project.id}.tagline`) }}
              </NText>
            </div>
          </NSpace>
          <NP depth="2" style="margin-top: 12px">
            {{ $t(`opensource.projects.${project.id}.description`) }}
          </NP>
          <template #action>
            <NButton
              tag="a"
              text
              type="primary"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ $t('opensource.viewOnGithub') }}
              <span class="nia-sr-only"> ({{ $t('common.opensInNewTab') }})</span>
              <template #icon>
                <NIcon><ExternalLink /></NIcon>
              </template>
            </NButton>
          </template>
        </NCard>
      </NGi>
    </NGrid>
  </div>
</template>
