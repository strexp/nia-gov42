// Content for the "About the Agency" page: the directorates.
import type { Component } from 'vue'
import { Building2, IdCard, Plane, Scale, ShieldCheck } from '@lucide/vue'

export interface Directorate {
  id: string
  icon: Component
  nameKey: string
  descriptionKey: string
}

export const directorates: Directorate[] = [
  {
    id: 'travel-documents',
    icon: IdCard,
    nameKey: 'about.directorates.travelDocuments.name',
    descriptionKey: 'about.directorates.travelDocuments.description',
  },
  {
    id: 'border-control',
    icon: Plane,
    nameKey: 'about.directorates.borderControl.name',
    descriptionKey: 'about.directorates.borderControl.description',
  },
  {
    id: 'pki',
    icon: ShieldCheck,
    nameKey: 'about.directorates.pki.name',
    descriptionKey: 'about.directorates.pki.description',
  },
  {
    id: 'legal',
    icon: Scale,
    nameKey: 'about.directorates.legal.name',
    descriptionKey: 'about.directorates.legal.description',
  },
  {
    id: 'corporate',
    icon: Building2,
    nameKey: 'about.directorates.corporate.name',
    descriptionKey: 'about.directorates.corporate.description',
  },
]
