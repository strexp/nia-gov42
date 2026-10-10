// External endpoints and repositories referenced across the portal.
import type { Component } from 'vue'
import { CreditCard, IdCard } from '@lucide/vue'

/** The ePass 42 service: CSCA, Document Signer certificates and the PKD. */
export const EPASS_URL = 'https://epass.nia.gov.dn42'

/** The trusted partner's ordering portal for personalisation and delivery. */
export const PARTNER_URL = 'https://portal.nia.dn42'

export interface Repository {
  /** i18n namespace under `opensource.projects`. */
  id: string
  icon: Component
  url: string
}

export const repositories: Repository[] = [
  { id: 'card42', icon: CreditCard, url: 'https://github.com/strexp/card42' },
  { id: 'epass42', icon: IdCard, url: 'https://github.com/strexp/epass42' },
]
