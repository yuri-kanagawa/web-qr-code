import textMeta from '@/locales/en/metas/text/meta'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = textMeta

export default function Layout({ children }: Props) {
  return <>{children}</>
}
