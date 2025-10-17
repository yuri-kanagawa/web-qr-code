'use client'
import { Language } from '@/domains/valueObjects/language'
import { SocialMediaPage } from '@/ui/pages/Social-media'

export default function Page() {
  return <SocialMediaPage language={Language.default()} />
}
