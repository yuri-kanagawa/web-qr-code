'use client'
import { PhonePage } from '@/ui/pages/Phone'
import { Language } from '@/domains'

export default function Page() {
  return <PhonePage language={Language.default()} />
}
