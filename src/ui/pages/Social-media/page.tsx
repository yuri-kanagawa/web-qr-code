import { FC } from 'react'

import { Language } from '@/domains/valueObjects/language'
import { PageWrapper } from '../../fragments/pageWrapper'

import { SocialMediaForm } from './_internal'

type Props = {
  language: Language
}

export const SocialMediaPage: FC<Props> = ({ language }) => {
  return (
    <PageWrapper language={language}>
      <SocialMediaForm language={language} />
    </PageWrapper>
  )
}
