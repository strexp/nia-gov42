// Task shortcuts shown on the home page ("Most requested"). These are the
// cross-cutting actions people arrive for, and are deliberately different from
// the service catalogue on the services page.
import type { Component } from 'vue'
import { CalendarClock, ClipboardCheck, Clock, FileWarning, IdCard, ShieldCheck } from '@lucide/vue'
import { EPASS_URL } from './links'

export interface Task {
  id: string
  /** i18n key for the label. */
  labelKey: string
  icon: Component
  to?: string
  href?: string
}

export const tasks: Task[] = [
  { id: 'apply', labelKey: 'home.tasks.apply', icon: IdCard, to: '/services' },
  { id: 'status', labelKey: 'home.tasks.status', icon: ClipboardCheck, href: EPASS_URL },
  { id: 'verify', labelKey: 'home.tasks.verify', icon: ShieldCheck, to: '/services' },
  { id: 'lost', labelKey: 'home.tasks.lost', icon: FileWarning, to: '/services' },
  { id: 'appointment', labelKey: 'home.tasks.appointment', icon: CalendarClock, to: '/contact' },
  { id: 'processing', labelKey: 'home.tasks.processing', icon: Clock, to: '/services' },
]
