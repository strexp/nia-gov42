<script setup lang="ts">
import {
  NAlert,
  NA,
  NCard,
  NDescriptions,
  NDescriptionsItem,
  NGi,
  NGrid,
  NH2,
  NIcon,
  NP,
  NSpace,
  NText,
} from 'naive-ui'
import { MapPin } from '@lucide/vue'
import { offices } from '~/data/contact'

const { t } = useI18n()

const email = computed(() => t('contact.email'))

usePageSeo({
  title: () => t('pages.contact.title'),
  description: () => t('pages.contact.description'),
})
</script>

<template>
  <div class="nia-page">
    <PageHeader :title="$t('pages.contact.title')" :subtitle="$t('pages.contact.description')" />

    <NSpace vertical size="large">
      <NP>
        <NText depth="3">{{ $t('contact.emailLabel') }}: </NText>
        <NA :href="`mailto:${email}`">{{ email }}</NA>
      </NP>

      <NAlert type="info" :show-icon="false">{{ $t('contact.appointmentNote') }}</NAlert>

      <section>
        <NH2>{{ $t('contact.officesTitle') }}</NH2>
        <NGrid :cols="2" :x-gap="16" :y-gap="16" item-responsive responsive="screen">
          <NGi v-for="office in offices" :key="office.id" span="2 s:2 m:1">
            <NCard>
              <template #header>
                <NSpace align="center" :size="8">
                  <NIcon><MapPin /></NIcon>
                  {{ t(office.nameKey) }}
                </NSpace>
              </template>
              <NDescriptions :column="1" label-placement="left">
                <NDescriptionsItem :label="$t('contact.addressLabel')">
                  {{ t(office.addressKey) }}
                </NDescriptionsItem>
                <NDescriptionsItem :label="$t('contact.phoneLabel')">
                  {{ office.phone }}
                </NDescriptionsItem>
                <NDescriptionsItem :label="$t('contact.hoursLabel')">
                  {{ t(office.hoursKey) }}
                </NDescriptionsItem>
              </NDescriptions>
            </NCard>
          </NGi>
        </NGrid>
      </section>
    </NSpace>
  </div>
</template>
