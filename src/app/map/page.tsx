'use client'
import { MapPage } from '@/ui/pages/Map'
import { Language } from '@/domains'

export default function Page() {
  return <MapPage language={Language.default()} />
}
