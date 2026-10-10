import { describe, expect, it } from 'vitest'
import en from '../i18n/locales/en.json'
import zh from '../i18n/locales/zh.json'

type Json = { [key: string]: Json | string } | string

function leafKeys(value: unknown, prefix = ''): string[] {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return Object.entries(value).flatMap(([key, child]) =>
      leafKeys(child, prefix ? `${prefix}.${key}` : key),
    )
  }
  return [prefix]
}

function unescapedAt(value: unknown, path = ''): string[] {
  if (typeof value === 'string') {
    // The literal-@ escape form is `{'@'}`.
    const stripped = value.replace(/\{'@'\}/g, '')
    return stripped.includes('@') ? [`${path}=${value}`] : []
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      unescapedAt(child, path ? `${path}.${key}` : key),
    )
  }
  return []
}

describe('i18n locale: en', () => {
  it('defines the site identity', () => {
    expect(en.site.name).toBe('National Immigration Agency')
    expect(en.site.shortName).toBe('NIA')
  })

  it('defines the primary navigation labels', () => {
    expect(en.nav.services).toBe('Services')
    expect(en.nav.contact).toBe('Contact')
  })
})

describe('i18n locale: zh', () => {
  it('defines the site identity', () => {
    expect(zh.site.name).toBe('国家移民管理局')
    expect(zh.site.shortName).toBe('NIA')
  })

  it('defines the primary navigation labels', () => {
    expect(zh.nav.services).toBe('服务')
    expect(zh.nav.contact).toBe('联系我们')
  })
})

describe('i18n locale coverage', () => {
  it('zh defines the same keys as en', () => {
    expect(leafKeys(zh as Json as unknown).sort()).toEqual(leafKeys(en).sort())
  })

  it('has no unescaped "@" in either locale (vue-i18n linked-message syntax)', () => {
    expect(unescapedAt(en, 'en')).toEqual([])
    expect(unescapedAt(zh, 'zh')).toEqual([])
  })
})
