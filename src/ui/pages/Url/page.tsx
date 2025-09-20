'use client'
import { UrlForm } from '@/ui/fragments'
import { PageWrapper } from '@/ui/fragments/pageWrapper'

interface Props {
  language: string
  url: string
}

export const Page = (props: Props) => {
  return (
    <PageWrapper>
      <UrlForm {...props} />
    </PageWrapper>
  )
}
