import smsMeta from '@/locales/en/metas/sms/meta'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = smsMeta

export default function Layout({ children }: Props) {
  return <>{children}</>
}
