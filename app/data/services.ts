// The service catalogue, grouped by theme.
//
// ePass 42 is a platform, not a single service: the certificate authority, the
// Document Signer service, the Public Key Directory and the stolen/lost
// document register it operates are listed here as individual services and
// tagged with their platform.
//
// `planned` services are not yet available: they are shown with a badge and are
// not linked. Names and summaries are referenced by i18n key.
import type { Component } from 'vue'
import {
  FileBadge,
  FileWarning,
  FolderTree,
  Landmark,
  Plane,
  ShieldCheck,
  Truck,
  Users,
} from '@lucide/vue'
import { EPASS_URL } from './links'

/** The platform that provides the certificate and document services. */
const EPASS = 'platforms.epass42'

export interface Service {
  id: string
  /** i18n key for the service name. */
  nameKey: string
  /** i18n key for the short summary. */
  summaryKey: string
  icon: Component
  /** Internal route, for services hosted on this portal. */
  to?: string
  /** External URL, for services hosted elsewhere. */
  href?: string
  /** Whether the service can be used without signing in. */
  public?: boolean
  /** Whether the service is announced but not yet available. */
  planned?: boolean
  /** i18n key for the platform that provides the service. */
  platformKey?: string
}

export interface ServiceGroup {
  id: string
  titleKey: string
  descriptionKey: string
  services: Service[]
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'pki',
    titleKey: 'services.groups.pki.title',
    descriptionKey: 'services.groups.pki.description',
    services: [
      {
        id: 'csca',
        nameKey: 'services.items.csca.name',
        summaryKey: 'services.items.csca.summary',
        icon: ShieldCheck,
        href: EPASS_URL,
        public: true,
        platformKey: EPASS,
      },
      {
        id: 'dsc',
        nameKey: 'services.items.dsc.name',
        summaryKey: 'services.items.dsc.summary',
        icon: FileBadge,
        href: EPASS_URL,
        platformKey: EPASS,
      },
      {
        id: 'pkd',
        nameKey: 'services.items.pkd.name',
        summaryKey: 'services.items.pkd.summary',
        icon: FolderTree,
        href: EPASS_URL,
        public: true,
        platformKey: EPASS,
      },
    ],
  },
  {
    id: 'travel-documents',
    titleKey: 'services.groups.travelDocuments.title',
    descriptionKey: 'services.groups.travelDocuments.description',
    services: [
      {
        id: 'sltd',
        nameKey: 'services.items.sltd.name',
        summaryKey: 'services.items.sltd.summary',
        icon: FileWarning,
        href: EPASS_URL,
        public: true,
        platformKey: EPASS,
      },
      {
        id: 'card-delivery',
        nameKey: 'services.items.cardDelivery.name',
        summaryKey: 'services.items.cardDelivery.summary',
        icon: Truck,
        href: EPASS_URL,
        platformKey: EPASS,
      },
    ],
  },
  {
    id: 'immigration',
    titleKey: 'services.groups.immigration.title',
    descriptionKey: 'services.groups.immigration.description',
    services: [
      {
        id: 'visas',
        nameKey: 'services.items.visas.name',
        summaryKey: 'services.items.visas.summary',
        icon: Plane,
        planned: true,
      },
      {
        id: 'residence',
        nameKey: 'services.items.residence.name',
        summaryKey: 'services.items.residence.summary',
        icon: Landmark,
        planned: true,
      },
      {
        id: 'citizenship',
        nameKey: 'services.items.citizenship.name',
        summaryKey: 'services.items.citizenship.summary',
        icon: Users,
        planned: true,
      },
    ],
  },
]
