'use client'

import { DeviceRedirectPage } from '@/ui/pages/Device/Redirect'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../../utils')
  const language = getLanguageFromParams(params.language)

  return <DeviceRedirectPage language={language} />
}
