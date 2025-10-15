import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  params: { language: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language } = params

  try {
    const { meta } = await import(`@/locales/${language}/metas/meta`)
    return meta.phone
  } catch (error) {
    // フォールバック: 英語のメタデータを使用
    const { meta } = await import('@/locales/en/metas/meta')
    return meta.phone
  }
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
