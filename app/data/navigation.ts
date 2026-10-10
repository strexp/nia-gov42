// Site navigation. Labels are always referenced by i18n key; the primary
// navigation also carries an icon for the header menu.
import type { Component } from 'vue'
import { Building2, Code, LayoutGrid, Mail, Megaphone } from '@lucide/vue'

export interface NavItem {
  /** i18n key for the visible label. */
  key: string
  /** Internal route. */
  to: string
  icon?: Component
}

export const primaryNavigation: NavItem[] = [
  { key: 'nav.services', to: '/services', icon: LayoutGrid },
  { key: 'nav.notices', to: '/notices', icon: Megaphone },
  { key: 'nav.openSource', to: '/opensource', icon: Code },
  { key: 'nav.about', to: '/about', icon: Building2 },
  { key: 'nav.contact', to: '/contact', icon: Mail },
]

export const legalNavigation: NavItem[] = [
  { key: 'footer.accessibility', to: '/accessibility' },
  { key: 'footer.privacy', to: '/privacy' },
  { key: 'footer.terms', to: '/terms' },
]
