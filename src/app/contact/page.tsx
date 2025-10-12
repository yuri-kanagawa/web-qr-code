'use client'
import { Page as ContactPage } from '@/ui/pages/contact'
import { Language } from '@/domains'

export default function Page() {
  return (
    <ContactPage
      language={Language.default()}
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
