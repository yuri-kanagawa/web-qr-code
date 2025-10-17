'use client'
import { Language } from '@/domains'
import { RootPage } from '@/ui/pages'

export default function Page() {
  return <RootPage language={Language.default()} />
}
