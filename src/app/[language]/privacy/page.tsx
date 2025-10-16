'use client'
import { Language } from '@/domains'
import { PageWrapper } from '@/ui/fragments/pageWrapper/PageWrapper'
import { PrivacyPolicyPage } from '@/ui/pages/privacy'

type Props = {
  params: {
    language: string
  }
}

export default function Privacy({ params }: Props) {
  const languageResult = Language.create(params.language)
  const language = languageResult.isSuccess
    ? languageResult.language!
    : Language.default()

  return (
    <PageWrapper language={language}>
      <PrivacyPolicyPage language={language} />
    </PageWrapper>
  )
}
