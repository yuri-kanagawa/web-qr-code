'use client'
import { FC } from 'react'
import { PageWrapper, MapForm } from '@/ui/fragments/'
interface Props {
  language: string
}
export const Page: FC<Props> = (props) => {
  return (
    <PageWrapper>
      <MapForm {...props} />
    </PageWrapper>
  )
}
