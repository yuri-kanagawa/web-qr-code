import { FC } from 'react'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { MapForm } from './internal'

export const Page: FC = () => {
  return (
    <PageWrapper>
      <MapForm />
    </PageWrapper>
  )
}
