'use client'
import React, { FC } from 'react'
import { useQrcode } from '@/hooks'
import { PageWrapper } from '../../fragments/pageWrapper'
import { TextField } from '@mui/material'
import { UploadFile } from '@/ui/cores/uploadFile/UploadFile'

type Props = {}

export const EditPage: FC<Props> = ({}) => {
  const { file, setFile } = useQrcode()
  return (
    <PageWrapper>
      <UploadFile file={file} onChange={setFile} />
    </PageWrapper>
  )
}
