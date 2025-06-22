'use client'
import React, { FC } from 'react'

import { PageWrapper } from '../../fragments/pageWrapper'

import { SocialMediaForm } from './_internal'

type Props = {
  language?: string
}

export const Page: FC<Props> = ({ language = 'en' }) => {
  return (
    <PageWrapper>
      <SocialMediaForm language={language} />
    </PageWrapper>
  )
}
