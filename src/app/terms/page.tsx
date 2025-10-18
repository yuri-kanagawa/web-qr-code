'use client'
import { Language } from '@/domains'
import { PageWrapper } from '@/ui/fragments/pageWrapper/PageWrapper'
import { TermsOfServicePage } from '@/ui/pages/Terms'

export default function Terms() {
  const language = Language.default()

  return (
    <PageWrapper language={language}>
      <TermsOfServicePage language={language} />
    </PageWrapper>
  )
}
