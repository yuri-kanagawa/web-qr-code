'use client'
import { Page as UrlPage } from '@/ui/pages/Url'
import { Language } from '@/domains/valueObjects/language'

export default function Page() {
  return <UrlPage language={Language.default()} url="" />
}
