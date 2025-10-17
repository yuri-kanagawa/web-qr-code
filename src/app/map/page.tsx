'use client'
import { Page as MapPage } from '@/ui/pages/Map/Page'
import { Language } from '@/domains'

export default function Page() {
  return <MapPage language={Language.default()} />
}
