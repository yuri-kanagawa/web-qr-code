import { Language } from '@/domains'
import { PageWrapper } from '@/ui/fragments/pageWrapper/PageWrapper'
import { PrivacyPolicyPage } from '@/ui/pages/Privacy'

export const metadata = Language.default().locale.meta.index

export default function Privacy() {
  const language = Language.default()

  return (
    <PageWrapper language={language}>
      <PrivacyPolicyPage language={language} />
    </PageWrapper>
  )
}
