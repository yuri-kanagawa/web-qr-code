import urlMeta from '@/locales/en/metas/url/meta'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = urlMeta

export default function Layout({ children }: Props) {
  return <>{children}</>
}
