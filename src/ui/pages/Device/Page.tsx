'use client'
import { Language, Qr } from '@/domains'
import { DeviceForm, PageWrapper } from '@/ui/fragments'

interface Props {
  language: Language
  qr: Qr
}

export const DevicePage = (props: Props) => {
  return (
    <PageWrapper language={props.language}>
      <DeviceForm language={props.language} qr={props.qr} />
    </PageWrapper>
  )
}
