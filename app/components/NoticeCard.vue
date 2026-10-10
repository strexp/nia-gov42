<script setup lang="ts">
import { NCard, NIcon, NSpace, NTag, NText, NTime } from 'naive-ui'
import { Megaphone, ShieldAlert, Sparkles } from '@lucide/vue'
import type { Component } from 'vue'
import type { NoticeCategory } from '~/data/notices'

defineProps<{ notice: { id: string; date: string; category: NoticeCategory }; compact?: boolean }>()

const { t } = useI18n()

const meta: Record<NoticeCategory, { type: 'info' | 'success' | 'warning'; icon: Component }> = {
  announcement: { type: 'info', icon: Megaphone },
  service: { type: 'success', icon: Sparkles },
  security: { type: 'warning', icon: ShieldAlert },
}
</script>

<template>
  <NCard class="nia-notice-card">
    <NSpace vertical size="small">
      <NSpace justify="space-between" align="center" :wrap="false">
        <NTag size="small" :type="meta[notice.category].type" :bordered="false">
          <NIcon style="margin-right: 4px">
            <component :is="meta[notice.category].icon" />
          </NIcon>
          {{ t(`notices.categories.${notice.category}`) }}
        </NTag>
        <NText depth="3">
          <NTime :time="new Date(notice.date)" type="date" />
        </NText>
      </NSpace>
      <NText strong style="font-size: 16px">
        {{ t(`notices.items.${notice.id}.title`) }}
      </NText>
      <NText v-if="!compact" depth="2">{{ t(`notices.items.${notice.id}.summary`) }}</NText>
    </NSpace>
  </NCard>
</template>

<style scoped>
.nia-notice-card {
  height: 100%;
}
</style>
