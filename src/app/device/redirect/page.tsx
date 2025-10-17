'use client'

import { Language } from '@/domains/valueObjects/language'
import { Page as DeviceRedirectPage } from '@/ui/pages/Device/redirect'

export default function Page() {
  return <DeviceRedirectPage language={Language.default()} />
}
