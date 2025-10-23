'use client'
import { PageWrapper } from '@/ui/fragments/pageWrapper/PageWrapper'
import { PrivacyPolicyPage } from '@/ui/pages/Privacy'

import { Language } from '@/domains'
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
      <PrivacyPolicyPage language={result.language} />
    </PageWrapper>
  )
}
