import readerMeta from '@/locales/en/metas/reader/meta'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = readerMeta

export default function Layout({ children }: Props) {
  return <>{children}</>
}
