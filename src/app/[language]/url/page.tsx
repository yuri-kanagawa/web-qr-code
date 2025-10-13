'use client'
import { Language } from '@/domains'
import { Page as UrlPage } from '@/ui/pages/url'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const languageResult = Language.create(params.language)
  const language =
    languageResult.isSuccess && languageResult.language
      ? languageResult.language
      : Language.default()

  return <UrlPage language={language} url="" />
}
