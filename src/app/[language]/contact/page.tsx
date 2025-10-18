'use client'
import { ContactPage } from '@/ui/pages/Contact'

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
      mobilePhone=""
      homePhone=""
      homeAddress=""
      homeUrl=""
      organization=""
      post=""
      workMobile=""
      workPhone=""
      workAddress=""
      workUrl=""
    />
  )
}
