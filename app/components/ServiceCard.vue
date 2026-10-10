<script setup lang="ts">
import { NButton, NCard, NIcon, NSpace, NTag, NText } from 'naive-ui'
import { computed, resolveComponent } from 'vue'
import type { Service } from '~/data/services'

const props = defineProps<{ service: Service }>()

const { t } = useI18n()

const available = computed(() => !props.service.planned)
const external = computed(() => Boolean(props.service.href))
const target = computed(() => props.service.to ?? props.service.href ?? '')
const wrapper = computed(() => (available.value ? resolveComponent('NuxtLink') : 'div'))
const linkProps = computed(() =>
  available.value
    ? {
        to: target.value,
        target: external.value ? '_blank' : undefined,
        rel: external.value ? 'noopener noreferrer' : undefined,
      }
    : {},
)
</script>

<template>
  <component :is="wrapper" v-bind="linkProps" class="nia-card-link">
    <NCard :hoverable="available" class="nia-card">
      <NSpace vertical size="small" align="start">
        <NIcon size="28"><component :is="service.icon" /></NIcon>
        <NText strong style="font-size: 16px">{{ t(service.nameKey) }}</NText>
        <NSpace :size="6" :wrap="true">
          <NTag v-if="service.planned" size="small" type="warning">
            {{ $t('services.planned') }}
          </NTag>
          <NTag v-else size="small" :type="service.public ? 'success' : 'info'">
            {{ service.public ? $t('services.public') : $t('services.signInRequired') }}
          </NTag>
          <NTag v-if="service.platformKey" size="small" :bordered="false">
            {{ t(service.platformKey) }}
          </NTag>
        </NSpace>
        <NText depth="2">{{ t(service.summaryKey) }}</NText>
        <span v-if="external" class="nia-sr-only"> ({{ $t('common.opensInNewTab') }})</span>
      </NSpace>
      <template #action>
        <NButton v-if="available" text type="primary">{{ $t('services.openService') }}</NButton>
        <NText v-else depth="3">{{ $t('services.plannedNote') }}</NText>
      </template>
    </NCard>
  </component>
</template>

<style scoped>
.nia-card-link {
  display: block;
  height: 100%;
}
.nia-card {
  height: 100%;
}
</style>
