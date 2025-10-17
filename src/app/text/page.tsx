'use client'
import React from 'react'

import { Page as TextPage } from '@/ui/pages/Text'
import { Language } from '@/domains/valueObjects/language'

export default function Page() {
  return <TextPage language={Language.default()} text={''} />
}
