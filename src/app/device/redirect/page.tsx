'use client'

import { Language } from '@/domains/valueObjects/language'
import { DeviceRedirectPage } from '@/ui/pages/Device/Redirect'

export default function Page() {
  return <DeviceRedirectPage language={Language.default()} />
}
