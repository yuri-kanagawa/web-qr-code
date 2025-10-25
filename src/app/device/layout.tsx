import deviceMeta from '@/locales/en/metas/device/meta'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = deviceMeta

export default function Layout({ children }: Props) {
  return <>{children}</>
}
