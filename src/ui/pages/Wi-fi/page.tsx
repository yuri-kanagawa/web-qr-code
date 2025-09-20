'use client'
import { PageWrapper, WiFiForm } from '@/ui/fragments'
import React, { FC } from 'react'
interface Props {
  language: string
  ssid: string
  password: string
  type: string
}
export const Page: FC<Props> = (props) => {
  return (
    <PageWrapper>
      <WiFiForm {...props} />
    </PageWrapper>
  )
}
