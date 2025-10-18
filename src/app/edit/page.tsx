'use client'
import { Language } from '@/domains'
import { EditPage } from '@/ui/pages/Edit/Page'

export default function Page() {
  return <EditPage language={Language.default()} />
}
