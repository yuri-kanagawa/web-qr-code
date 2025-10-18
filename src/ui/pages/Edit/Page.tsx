'use client'
import { Language } from '@/domains'
import { PageWrapper } from '@/ui/fragments'
import { FC } from 'react'
import { FileEditor } from './internal'

interface Props {
  language: Language
}

export const EditPage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <FileEditor {...props} />
    </PageWrapper>
  )
}
