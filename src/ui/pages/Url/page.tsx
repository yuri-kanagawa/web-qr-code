import { UrlForm } from './internal'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { useSearchParams } from 'next/navigation'

interface Props {
  language?: string
}

export const Page = ({ language = 'en' }: Props) => {
  const searchParams = useSearchParams()
  const initialUrl = searchParams.get('url') || ''

  return (
    <PageWrapper>
      <UrlForm language={language} initialUrl={initialUrl} />
    </PageWrapper>
  )
}
