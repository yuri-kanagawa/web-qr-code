import { Language } from '@/domains'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  params: { language: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const language =
    Language.create(params.language).isSuccess &&
    Language.create(params.language).language
      ? Language.create(params.language).language!
      : Language.default()
  return language.locale.meta.privacy
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
