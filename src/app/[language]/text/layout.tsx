import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  params: { language: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { getMeta } = await import('../utils')
  return (await getMeta(params.language)).text
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
