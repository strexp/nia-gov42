// Notices and announcements, dated to the ePass 42 commits that delivered the
// feature. Titles, summaries and category labels live in i18n under
// `notices.items.<id>` and `notices.categories.<category>`.

export type NoticeCategory = 'announcement' | 'service' | 'security'

export interface Notice {
  id: string
  /** Publication date (ISO), matching the ePass 42 commit. */
  date: string
  category: NoticeCategory
}

/** Newest first. */
export const notices: Notice[] = [
  { id: 'help', date: '2026-10-11', category: 'service' },
  { id: 'chinese', date: '2026-10-10', category: 'announcement' },
  { id: 'sltd', date: '2026-10-10', category: 'service' },
  { id: 'dscIssuance', date: '2026-10-08', category: 'announcement' },
  { id: 'pkdInterfaces', date: '2026-10-08', category: 'service' },
]
