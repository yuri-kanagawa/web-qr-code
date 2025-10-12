'use client'
import { SmsPage } from '@/ui/pages/sms'
import { Language } from '@/domains'

export default function Page() {
  return <SmsPage language={Language.default()} phoneNumber="" body="" />
}
