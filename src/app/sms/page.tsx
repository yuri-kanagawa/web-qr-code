'use client'
import { SmsPage } from '@/ui/pages/Sms'
import { Language } from '@/domains'

export default function Page() {
  return <SmsPage language={Language.default()} phoneNumber="" body="" />
}
