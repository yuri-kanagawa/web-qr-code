import { UrlForm } from './internal'
import { PageWrapper } from '@/ui/fragments/pageWrapper'

interface Props {
  language?: string
}

export const Page = ({ language = 'en' }: Props) => {
  return (
    <PageWrapper>
      <UrlForm language={language} />
    </PageWrapper>
  )
}
