'use client'
import { Language } from '@/domains'
import { Page as WiFiPage } from '@/ui/pages/wi-fi'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const languageResult = Language.create(params.language)
  const language =
    languageResult.isSuccess && languageResult.language
      ? languageResult.language
      : Language.default()

  return <WiFiPage language={language} ssid="" password="" type="" />
}

