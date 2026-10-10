// Trusted partners authorised to personalise and deliver NIA travel documents.
import type { Component } from 'vue'
import { Handshake } from '@lucide/vue'
import { PARTNER_URL } from './links'

export interface Partner {
  id: string
  icon: Component
  /** i18n key for the partner name (a proper noun). */
  nameKey: string
  /** i18n key for a short description of the partner. */
  descriptionKey: string
  /** The partner's own ordering portal. */
  url: string
}

export const partners: Partner[] = [
  {
    id: 'strexp',
    icon: Handshake,
    nameKey: 'partners.items.strexp.name',
    descriptionKey: 'partners.items.strexp.description',
    url: PARTNER_URL,
  },
]
