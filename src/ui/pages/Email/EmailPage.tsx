'use client'
import React, { FC } from 'react'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { EmailTextField } from '@/ui/cores/textField'
import { useQrcode } from '@/hooks'
import { useEmailQRCodeForm } from '@/ui/pages/Email/hooks'
import { Desktop } from '@/ui/pages/Email/internal/Desktop'

type Props = {}

export const EmailPage: FC<Props> = ({}) => {
  const { control } = useEmailQRCodeForm()
  return (
    <PageWrapper>
      <Desktop control={control} />
    </PageWrapper>
  )
}
