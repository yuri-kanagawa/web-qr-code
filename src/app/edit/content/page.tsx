'use client'
import { Language } from '@/domains'
import { EditContentPage } from '@/ui/pages/Edit/Content/Page'

export default function Page() {
  return <EditContentPage language={Language.default()} />
}
