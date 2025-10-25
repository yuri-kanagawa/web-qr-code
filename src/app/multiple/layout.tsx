import multipleMeta from '@/locales/en/metas/multiple/meta'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = multipleMeta

export default function Layout({ children }: Props) {
  return <>{children}</>
}
