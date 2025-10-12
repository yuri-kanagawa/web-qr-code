'use client'
import { PageWrapper, DeviceForm } from '@/ui/fragments'
import { Language } from '@/domains/valueObjects/language'

interface Props {
  language: Language
}

export const Page = (props: Props) => {
  return (
    <PageWrapper language={props.language}>
      <DeviceForm {...props} />
    </PageWrapper>
  )
}
