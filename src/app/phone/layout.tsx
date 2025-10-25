import phoneMeta from '@/locales/en/metas/phone/meta'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = phoneMeta

export default function Layout({ children }: Props) {
  return <>{children}</>
}
