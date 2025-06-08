'use client'
import React, { FC } from 'react'
import { useQrCode } from '@/hooks'
import { PageWrapper } from '../../fragments/pageWrapper'
import { TextField } from '@mui/material'
import { UploadFile } from '@/ui/fragments/input/InputFile/InputFile'

type Props = {}

export const EditPage: FC<Props> = ({}) => {
  const {} = useQrCode()
  return (
    <PageWrapper>
      <></>
    </PageWrapper>
  )
}
