'use client'
import { Language } from '@/domains/valueObjects/language'
import { Page as SocialMediaPage } from '@/ui/pages/Social-media/page'

export default function Page() {
  return <SocialMediaPage language={Language.default()} />
}
