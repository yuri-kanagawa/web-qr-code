'use client'
import React, { FC, useMemo } from 'react'
import { PageWrapper } from '../../fragments/pageWrapper'
import { TextForm } from './internal'

type Props = {}

export const TextPage: FC<Props> = ({}) => {
  return (
    <PageWrapper>
      <TextForm />
    </PageWrapper>
  )
}
