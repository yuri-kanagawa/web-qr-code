'use client'
import { Language } from '@/domains'
import { PageWrapper } from '@/ui/fragments/pageWrapper/PageWrapper'
import { TermsOfServicePage } from '@/ui/pages/Terms'

type Props = {
  params: {
    language: string
  }
}

export default function Terms({ params }: Props) {
  const languageResult = Language.create(params.language)
  const language = languageResult.isSuccess && languageResult.language
    ? languageResult.language
    : Language.default()

  return (
    <PageWrapper language={language}>
      <TermsOfServicePage language={language} />
    </PageWrapper>
  )
}
