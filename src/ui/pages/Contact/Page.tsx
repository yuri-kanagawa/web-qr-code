import { PageWrapper } from '../../fragments/pageWrapper'

import React, { FC } from 'react'
import { ContactForm } from './internal'

type Props = {}

export const Page: FC<Props> = ({}) => {
  return (
    <PageWrapper>
      <ContactForm />
    </PageWrapper>
  )
}
