'use client'
import React, { FC } from 'react'
import { PageWrapper } from '../../fragments/pageWrapper'
import { TextForm } from '@/ui/fragments'

interface Props {
  language: string
  text: string
}

export const Page: FC<Props> = (props) => {
  return (
    <PageWrapper>
      <TextForm {...props} />
    </PageWrapper>
  )
}
