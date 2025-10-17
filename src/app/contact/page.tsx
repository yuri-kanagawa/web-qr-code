'use client'
import { Language } from '@/domains'
import { Page as ContactPage } from '@/ui/pages/contact'

export default function Page() {
  return (
    <ContactPage
      language={Language.default()}
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
