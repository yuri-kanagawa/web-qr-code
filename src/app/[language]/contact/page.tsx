'use client'
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
      phoneNumber=""
      homeAddress=""
      homeUrl=""
      organization=""
      post=""
      workPhone=""
      workAddress=""
      workUrl=""
    />
  )
}
