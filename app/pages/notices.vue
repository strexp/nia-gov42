<script setup lang="ts">
import { NGi, NGrid } from 'naive-ui'
import { notices } from '~/data/notices'

const { t } = useI18n()

usePageSeo({
  title: () => t('pages.notices.title'),
  description: () => t('pages.notices.description'),
})
</script>

<template>
  <div class="nia-page">
    <PageHeader :title="$t('pages.notices.title')" :subtitle="$t('pages.notices.description')" />

    <NGrid :cols="2" :x-gap="16" :y-gap="16" item-responsive responsive="screen">
      <NGi v-for="notice in notices" :key="notice.id" span="2 s:2 m:1">
        <NoticeCard :notice="notice" />
      </NGi>
    </NGrid>
  </div>
</template>
