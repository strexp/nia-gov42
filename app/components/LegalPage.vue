<script setup lang="ts">
import { NP, NSpace } from 'naive-ui'

/** Renders a legal page from its i18n section (`legal.<section>`). */
const props = defineProps<{ section: string }>()

const { t, tm, rt } = useI18n()

const title = computed(() => t(`legal.${props.section}.title`))
const paragraphs = computed(() =>
  (tm(`legal.${props.section}.body`) as unknown[]).map((item) => rt(item as string)),
)

usePageSeo({
  title: () => title.value,
  description: () => t(`legal.${props.section}.description`),
})
</script>

<template>
  <div class="nia-page">
    <PageHeader :title="title" :subtitle="t(`legal.${section}.description`)" />
    <NSpace vertical size="medium">
      <NP v-for="(paragraph, index) in paragraphs" :key="index" depth="2">
        {{ paragraph }}
      </NP>
    </NSpace>
  </div>
</template>
