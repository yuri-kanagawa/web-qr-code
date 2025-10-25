import mapMeta from '@/locales/en/metas/map/meta'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = mapMeta

export default function Layout({ children }: Props) {
  return <>{children}</>
}
