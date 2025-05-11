'use client'
import React, { FC } from 'react'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { EmailTextField } from '@/ui/cores/textField'
import { useQrcode } from '@/hooks'
import { useEmailQRCodeForm } from '@/ui/pages/Email/hooks'
import { EmailForm } from '@/ui/pages/Email/internal'

type Props = {}

export const EmailPage: FC<Props> = ({}) => {
  return (
    <PageWrapper>
      <EmailForm />
    </PageWrapper>
  )
}
