import { UrlForm } from '@/ui/fragments'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { Language } from '@/domains/valueObjects/language'

interface Props {
  language: Language
  url: string
}

export const Page = (props: Props) => {
  return (
    <PageWrapper language={props.language}>
      <UrlForm {...props} />
    </PageWrapper>
  )
}
