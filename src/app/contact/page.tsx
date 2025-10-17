'use client'
import { Language } from '@/domains'
import { ContactPage } from '@/ui/pages/Contact'

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
