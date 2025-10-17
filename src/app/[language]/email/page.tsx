'use client'
import { EmailPage } from '@/ui/pages/Email'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <EmailPage language={language} email={''} subject={''} body={''} />
}
