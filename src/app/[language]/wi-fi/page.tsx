'use client'
import { Page as WiFiPage } from '@/ui/pages/wi-fi'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <WiFiPage language={language} ssid="" password="" type="" />
}
