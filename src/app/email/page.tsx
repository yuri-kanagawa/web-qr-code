'use client'
import { Page as EmailPage } from '@/ui/pages/email'
import { Language } from '@/domains/valueObjects/language'

export default function Page() {
  return (
    <EmailPage
      language={Language.default()}
      email={''}
      subject={''}
      body={''}
    />
  )
}
