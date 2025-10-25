import { Language } from '@/domains'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  params: { language: string }
}

// 静的パスを生成
export function generateStaticParams() {
  return Language.getPageLanguages().map((lang) => ({ language: lang.key }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { getMeta } = await import('./utils')
  return (await getMeta(params.language)).root
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
