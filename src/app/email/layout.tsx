import emailMeta from '@/locales/en/metas/email/meta'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = emailMeta

export default function Layout({ children }: Props) {
  return <>{children}</>
}
