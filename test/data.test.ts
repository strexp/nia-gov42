import { describe, expect, it } from 'vitest'
import { serviceGroups } from '../app/data/services'
import { legalNavigation, primaryNavigation } from '../app/data/navigation'
import { offices } from '../app/data/contact'
import { notices } from '../app/data/notices'
import { tasks } from '../app/data/tasks'
import { directorates } from '../app/data/about'
import { partners } from '../app/data/partners'
import { EPASS_URL } from '../app/data/links'
import en from '../i18n/locales/en.json'

type Json = { [key: string]: Json | string } | string

function resolve(path: string): string | undefined {
  return path.split('.').reduce<Json | undefined>((acc, key) => {
    if (acc && typeof acc === 'object') return acc[key]
    return undefined
  }, en as Json) as string | undefined
}

const services = serviceGroups.flatMap((group) => group.services)

const keys: string[] = [
  ...serviceGroups.flatMap((group) => [
    group.titleKey,
    group.descriptionKey,
    ...group.services.flatMap((service) => [
      service.nameKey,
      service.summaryKey,
      ...(service.platformKey ? [service.platformKey] : []),
    ]),
  ]),
  ...primaryNavigation.map((item) => item.key),
  ...legalNavigation.map((item) => item.key),
  ...offices.flatMap((office) => [office.nameKey, office.addressKey, office.hoursKey]),
  ...notices.flatMap((notice) => [
    `notices.items.${notice.id}.title`,
    `notices.items.${notice.id}.summary`,
    `notices.categories.${notice.category}`,
  ]),
  ...tasks.map((task) => task.labelKey),
  ...directorates.flatMap((directorate) => [directorate.nameKey, directorate.descriptionKey]),
  ...partners.flatMap((partner) => [partner.nameKey, partner.descriptionKey]),
]

describe('data i18n keys', () => {
  it('resolves every referenced key', () => {
    expect(keys.filter((key) => resolve(key) === undefined)).toEqual([])
  })
})

describe('service catalogue', () => {
  it('has unique ids', () => {
    const ids = services.map((service) => service.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('points every available service at a route or URL, and no planned service anywhere', () => {
    for (const service of services) {
      if (service.planned) {
        expect(service.to ?? service.href, service.id).toBeUndefined()
      } else {
        expect(Boolean(service.to ?? service.href), service.id).toBe(true)
      }
    }
  })

  it('lists the ePass 42 platform services individually', () => {
    const ids = services.map((service) => service.id)
    expect(ids).toEqual(expect.arrayContaining(['csca', 'dsc', 'pkd', 'sltd']))
    for (const id of ['csca', 'dsc', 'pkd', 'sltd']) {
      const service = services.find((item) => item.id === id)
      expect(service?.planned, id).not.toBe(true)
      expect(service?.platformKey, id).toBe('platforms.epass42')
    }
  })

  it('makes the delivery service available through the ePass 42 platform', () => {
    const delivery = services.find((service) => service.id === 'card-delivery')
    expect(delivery?.planned).not.toBe(true)
    expect(delivery?.href).toBe(EPASS_URL)
    expect(delivery?.platformKey).toBe('platforms.epass42')
  })
})
