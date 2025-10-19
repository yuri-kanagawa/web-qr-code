'use client'
import { Language } from '@/domains/valueObjects/language'
import { PageWrapper, WiFiForm } from '@/ui/fragments'
import { FC } from 'react'

interface Props {
  language: Language
  ssid: string
  password: string
  type: string
}
export const WiFiPage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <WiFiForm {...props} />
    </PageWrapper>
  )
}
