'use client'
import { Language } from '@/domains'
import { Page as ContactPage } from '@/ui/pages/contact'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return (
    <ContactPage
      language={language}
      firstName=""
      lastName=""
      middleName=""
      email=""
      organization=""
      url=""
      phoneNumber=""
      post=""
      businessCellularTelephone=""
      privateCellularTelephone=""
      address=""
    />
  )
}
