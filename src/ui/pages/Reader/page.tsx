'use client'
import React, { FC } from 'react'
import { PageWrapper } from '@/ui/fragments'
import { FileReader } from './internal'
import { Language } from '@/domains'
interface Props {
  language: Language
}

export const Page: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <FileReader {...props} />
    </PageWrapper>
  )
}
