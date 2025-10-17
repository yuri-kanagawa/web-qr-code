'use client'
import { Language } from '@/domains/valueObjects/language'
import { DeviceForm, PageWrapper } from '@/ui/fragments'

interface Props {
  language: Language
}

export const DevicePage = (props: Props) => {
  return (
    <PageWrapper language={props.language}>
      <DeviceForm {...props} />
    </PageWrapper>
  )
}
