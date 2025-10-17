'use client'
import { Language } from '@/domains'
import { ReaderPage } from '@/ui/pages/Reader'

export default function Page() {
  return <ReaderPage language={Language.default()} />
}
