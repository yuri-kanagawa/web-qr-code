'use client'
import { Language } from '@/domains'
import { PageWrapper } from '@/ui/fragments'
import { FC } from 'react'
import { QrFormSelector } from './internal'

interface Props {
  language: Language
}

export const EditContentPage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <QrFormSelector {...props} />
    </PageWrapper>
  )
}
