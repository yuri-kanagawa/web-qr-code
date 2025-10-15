'use client'
import { Language } from '@/domains'
import { Page as ContactPage } from '@/ui/pages/contact'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const languageResult = Language.create(params.language)
  const language =
    languageResult.isSuccess && languageResult.language
      ? languageResult.language
      : Language.default()

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

