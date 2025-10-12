'use client'
import { PageWrapper, WiFiForm } from '@/ui/fragments'
import { Language } from '@/domains/valueObjects/language'
import React, { FC } from 'react'

interface Props {
  language: Language
  ssid: string
  password: string
  type: string
}
export const Page: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <WiFiForm {...props} />
    </PageWrapper>
  )
}
