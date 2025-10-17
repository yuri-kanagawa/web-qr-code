import { Language } from '@/domains'
import { PageWrapper } from '@/ui/fragments/pageWrapper/PageWrapper'
import { TermsOfServicePage } from '@/ui/pages/Terms'

export const metadata = Language.default().locale.meta.index

export default function Terms() {
  const language = Language.default()

  return (
    <PageWrapper language={language}>
      <TermsOfServicePage language={language} />
    </PageWrapper>
  )
}
