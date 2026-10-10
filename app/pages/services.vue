<script setup lang="ts">
import {
  NButton,
  NCard,
  NCollapse,
  NCollapseItem,
  NGrid,
  NGi,
  NH2,
  NIcon,
  NP,
  NSpace,
} from 'naive-ui'
import { ExternalLink } from '@lucide/vue'
import { partners } from '~/data/partners'
import { serviceGroups } from '~/data/services'

const { t } = useI18n()

const faqKeys = ['apply', 'verify', 'delivery'] as const

usePageSeo({
  title: () => t('pages.services.title'),
  description: () => t('pages.services.description'),
})
</script>

<template>
  <div class="nia-page">
    <PageHeader :title="$t('pages.services.title')" :subtitle="$t('pages.services.description')" />

    <NSpace vertical size="large">
      <section v-for="group in serviceGroups" :key="group.id">
        <NH2>{{ t(group.titleKey) }}</NH2>
        <NP depth="2">{{ t(group.descriptionKey) }}</NP>
        <NGrid :cols="3" :x-gap="16" :y-gap="16" item-responsive responsive="screen">
          <NGi v-for="service in group.services" :key="service.id" span="3 s:3 m:1">
            <ServiceCard :service="service" />
          </NGi>
        </NGrid>
      </section>

      <NP depth="3">{{ $t('services.availableNote') }}</NP>

      <section>
        <NH2>{{ $t('partners.title') }}</NH2>
        <NP depth="2">{{ $t('partners.description') }}</NP>
        <NGrid :cols="2" :x-gap="16" :y-gap="16" item-responsive responsive="screen">
          <NGi v-for="partner in partners" :key="partner.id" span="2 s:2 m:1">
            <NCard>
              <NSpace align="center" :size="12">
                <NIcon size="22"><component :is="partner.icon" /></NIcon>
                <NText strong>{{ t(partner.nameKey) }}</NText>
              </NSpace>
              <NP depth="2" style="margin-top: 8px">{{ t(partner.descriptionKey) }}</NP>
              <template #action>
                <NButton
                  tag="a"
                  text
                  type="primary"
                  :href="partner.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ $t('partners.orderCta') }}
                  <span class="nia-sr-only"> ({{ $t('common.opensInNewTab') }})</span>
                  <template #icon>
                    <NIcon><ExternalLink /></NIcon>
                  </template>
                </NButton>
              </template>
            </NCard>
          </NGi>
        </NGrid>
      </section>

      <section>
        <NH2>{{ $t('services.faqTitle') }}</NH2>
        <NCollapse accordion>
          <NCollapseItem v-for="key in faqKeys" :key="key" :title="$t(`services.faq.${key}.q`)">
            {{ $t(`services.faq.${key}.a`) }}
          </NCollapseItem>
        </NCollapse>
      </section>
    </NSpace>
  </div>
</template>
