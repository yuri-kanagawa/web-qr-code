import { Language } from '@/domains/valueObjects/language'
import { UrlForm } from '@/ui/fragments'
import { PageWrapper } from '@/ui/fragments/pageWrapper'

interface Props {
  language: Language
  url: string
}

export const UrlPage = (props: Props) => {
  return (
    <PageWrapper language={props.language}>
      <UrlForm {...props} />
    </PageWrapper>
  )
}
