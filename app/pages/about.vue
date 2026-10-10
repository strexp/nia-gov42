<script setup lang="ts">
import { NCard, NGrid, NGi, NH2, NIcon, NLi, NP, NSpace, NText, NUl } from 'naive-ui'
import { directorates } from '~/data/about'

const { t } = useI18n()

const mandateKeys = [
  'about.mandateItem1',
  'about.mandateItem2',
  'about.mandateItem3',
  'about.mandateItem4',
] as const

usePageSeo({
  title: () => t('pages.about.title'),
  description: () => t('pages.about.description'),
})
</script>

<template>
  <div class="nia-page">
    <PageHeader :title="$t('pages.about.title')" :subtitle="$t('pages.about.description')" />

    <NSpace vertical size="large">
      <NP depth="2">{{ $t('about.intro') }}</NP>

      <section>
        <NH2>{{ $t('about.missionTitle') }}</NH2>
        <NP depth="2">{{ $t('about.mission') }}</NP>
      </section>

      <section>
        <NH2>{{ $t('about.mandateTitle') }}</NH2>
        <NUl>
          <NLi v-for="key in mandateKeys" :key="key">{{ $t(key) }}</NLi>
        </NUl>
      </section>

      <section>
        <NH2>{{ $t('about.directoratesTitle') }}</NH2>
        <NGrid :cols="2" :x-gap="16" :y-gap="16" item-responsive responsive="screen">
          <NGi v-for="directorate in directorates" :key="directorate.id" span="2 s:2 m:1">
            <NCard>
              <NSpace vertical size="small">
                <NSpace align="center" :size="8">
                  <NIcon size="22"><component :is="directorate.icon" /></NIcon>
                  <NText strong>{{ t(directorate.nameKey) }}</NText>
                </NSpace>
                <NText depth="2">{{ t(directorate.descriptionKey) }}</NText>
              </NSpace>
            </NCard>
          </NGi>
        </NGrid>
      </section>
    </NSpace>
  </div>
</template>
