'use client'
import { Language } from '@/domains'
import { DevicePage } from '@/ui/pages/Device'

export default function Page() {
  return <DevicePage language={Language.default()} />
}
