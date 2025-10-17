'use client'
import React, { FC } from 'react'
import { PageWrapper } from '../../fragments/pageWrapper'
import { TextForm } from '@/ui/fragments'
import { Language } from '@/domains/valueObjects/language'

interface Props {
  language: Language
  text: string
}

export const TextPage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <TextForm {...props} />
    </PageWrapper>
  )
}
