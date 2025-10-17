'use client'
import { Language } from '@/domains'
import { SmsPage } from '@/ui/pages/Sms'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <SmsPage language={language} phoneNumber="" body="" />
}
