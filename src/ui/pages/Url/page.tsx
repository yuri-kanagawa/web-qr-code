'use client'

import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { UrlForm } from './internal'
import { FC } from 'react'
type Props = {
  language: string
}
export const Page: FC<Props> = ({ language }) => {
  return (
    <PageWrapper>
      <UrlForm  />
    </PageWrapper>
  )
}
