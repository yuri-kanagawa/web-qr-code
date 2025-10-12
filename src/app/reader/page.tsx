'use client'
import { Page as ReaderPage } from '@/ui/pages/reader/Page'
import { Language } from '@/domains'

export default function Page() {
  return <ReaderPage language={Language.default()} />
}
