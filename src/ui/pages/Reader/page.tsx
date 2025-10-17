'use client'
import { Language } from '@/domains'
import { PageWrapper } from '@/ui/fragments'
import { FC } from 'react'
import { FileReader } from './internal'
interface Props {
  language: Language
}

export const ReaderPage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <FileReader {...props} />
    </PageWrapper>
  )
}
