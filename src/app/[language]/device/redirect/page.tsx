'use client'

import { Page as DeviceRedirectPage } from '@/ui/pages/device/redirect'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../../utils')
  const language = getLanguageFromParams(params.language)

  return <DeviceRedirectPage language={language} />
}
