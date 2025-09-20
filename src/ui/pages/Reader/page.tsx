'use client'
import React, { FC } from 'react'
import { PageWrapper } from '@/ui/fragments'
import { FileReader } from './internal'
interface Props {
  language: string
}

export const Page: FC<Props> = (props) => {
  return (
    <PageWrapper>
      <FileReader {...props} />
    </PageWrapper>
  )
}
