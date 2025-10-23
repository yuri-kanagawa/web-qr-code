'use client'
import { Language } from '@/domains'
import { PageWrapper } from '@/ui/fragments/pageWrapper/PageWrapper'
import { TermsOfServicePage } from '@/ui/pages/Terms'
import { notFound } from 'next/navigation'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const result = Language.create(params.language)
  if (result.isFailure || !result.language) {
    return notFound()
  }

  return (
    <PageWrapper language={result.language}>
      <TermsOfServicePage language={result.language} />
    </PageWrapper>
  )
}
