'use client'
import { FC } from 'react'
import { PageWrapper, MapForm } from '@/ui/fragments/'
import { Language } from '@/domains/valueObjects/language'

interface Props {
  language: Language
}
export const MapPage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <MapForm {...props} />
    </PageWrapper>
  )
}
