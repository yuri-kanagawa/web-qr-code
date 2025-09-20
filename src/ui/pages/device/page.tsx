'use client'
import { PageWrapper, DeviceForm } from '@/ui/fragments'

interface Props {
  language: string
}

export const Page = (props: Props) => {
  return (
    <PageWrapper>
      <DeviceForm {...props} />
    </PageWrapper>
  )
}
