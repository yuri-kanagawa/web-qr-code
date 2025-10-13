'use client'
import { Language } from '@/domains'
import { Page as ReaderPage } from '@/ui/pages/reader'

export default function Page() {
  return <ReaderPage language={Language.default()} />
}
