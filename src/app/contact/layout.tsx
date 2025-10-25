import contactMeta from '@/locales/en/metas/contact/meta'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = contactMeta

export default function Layout({ children }: Props) {
  return <>{children}</>
}
