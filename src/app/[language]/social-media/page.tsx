'use client'
import { Language } from '@/domains'
import { Page as SocialMediaPage } from '@/ui/pages/Social-media/page'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const languageResult = Language.create(params.language)
  const language =
    languageResult.isSuccess && languageResult.language
      ? languageResult.language
      : Language.default()

  return <SocialMediaPage language={language} />
}

