import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import en from '../i18n/locales/en.json'
import zh from '../i18n/locales/zh.json'

type Json = { [key: string]: Json | string } | string

function resolve(source: Json, path: string): string | undefined {
  return path.split('.').reduce<Json | undefined>((acc, key) => {
    if (acc && typeof acc === 'object') return acc[key]
    return undefined
  }, source) as string | undefined
}

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return walk(path)
    return path.endsWith('.vue') || path.endsWith('.ts') ? [path] : []
  })
}

// Match static `t('a.b.c')` and `$t('a.b.c')` calls; dynamic keys (with `${`)
// are skipped.
const KEY_PATTERN = /\bt\(\s*['"`]([A-Za-z0-9_.]+)['"`]/g

function collectKeys(): Set<string> {
  const keys = new Set<string>()
  for (const file of walk('app')) {
    const source = readFileSync(file, 'utf8')
    for (const match of source.matchAll(KEY_PATTERN)) {
      if (match[1]) keys.add(match[1])
    }
  }
  return keys
}

describe('i18n key usage in source', () => {
  const keys = [...collectKeys()].sort()

  it('resolves every static t() key used in app/ (en)', () => {
    expect(keys.filter((key) => resolve(en as Json, key) === undefined)).toEqual([])
    expect(keys.length).toBeGreaterThan(20)
  })

  it('resolves every static t() key used in app/ (zh)', () => {
    expect(keys.filter((key) => resolve(zh as Json, key) === undefined)).toEqual([])
  })
})
