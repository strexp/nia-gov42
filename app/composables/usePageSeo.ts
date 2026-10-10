import type { MaybeRefOrGetter } from 'vue'

export interface PageSeo {
  title?: MaybeRefOrGetter<string | undefined>
  description?: MaybeRefOrGetter<string | undefined>
}

/**
 * Set the page title, description and Open Graph / Twitter card metadata.
 * Titles and descriptions are expected to be i18n-driven.
 */
export function usePageSeo(meta: PageSeo) {
  useSeoMeta({
    title: meta.title,
    description: meta.description,
    ogTitle: meta.title,
    ogDescription: meta.description,
    ogType: 'website',
    twitterTitle: meta.title,
    twitterDescription: meta.description,
    twitterCard: 'summary',
  })
}
