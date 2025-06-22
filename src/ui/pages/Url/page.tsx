'use client'

import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { UrlForm } from './internal'
import { FC } from 'react'
type Props = {
  language?: string
}
export const Page: FC<Props> = ({ language = 'en' }) => {
  return (
    <PageWrapper>
      <UrlForm />
    </PageWrapper>
  )
}
