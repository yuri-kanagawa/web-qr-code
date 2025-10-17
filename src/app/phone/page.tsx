'use client'
import { Page as PhonePage } from '@/ui/pages/Phone'
import { Language } from '@/domains'

export default function Page() {
  return <PhonePage language={Language.default()} />
}
