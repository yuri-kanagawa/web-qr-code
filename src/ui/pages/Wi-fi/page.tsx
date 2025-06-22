import { useQrCode } from '@/hooks'
import { PageWrapper } from '../../fragments/pageWrapper'
import { WiFiForm } from './_internal'
import React, { FC } from 'react'
type Props = {}
export const Page: FC<Props> = ({}) => {
  return (
    <PageWrapper>
      <WiFiForm />
    </PageWrapper>
  )
}
