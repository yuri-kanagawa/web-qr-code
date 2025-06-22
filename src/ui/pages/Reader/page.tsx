'use client'
import React, { FC } from 'react'
import { PageWrapper } from '../../fragments/pageWrapper'
import { FileReader } from './internal'

type Props = {}

export const Page: FC<Props> = ({}) => {
  return (
    <PageWrapper>
      <FileReader />
    </PageWrapper>
  )
}
