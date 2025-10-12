'use client'
import { Page as PhonePage } from '@/ui/pages/phone'
import { Language } from '@/domains'

export default function Page() {
  return <PhonePage language={Language.default()} />
}
