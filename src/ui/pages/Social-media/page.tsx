'use client'
import React, { FC } from 'react'

import { PageWrapper } from '../../fragments/pageWrapper'
import { Language } from '@/domains/valueObjects/language'

import { SocialMediaForm } from './_internal'

type Props = {
  language: Language
}

export const Page: FC<Props> = ({ language }) => {
  return (
    <PageWrapper language={language}>
      <SocialMediaForm language={language} />
    </PageWrapper>
  )
}
