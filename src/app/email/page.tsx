'use client'
import { Language } from '@/domains/valueObjects/language'
import { Page as EmailPage } from '@/ui/pages/Email'

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
