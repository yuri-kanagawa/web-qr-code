import { Language } from '@/domains'
import { Page as MapPage } from '@/ui/pages/map/Page'
import { Metadata } from 'next'

type Props = {
  params: { language: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language } = params

  try {
    const { meta } = await import(`@/locales/${language}/metas/meta`)
    return meta.map
  } catch (error) {
    // フォールバック: 英語のメタデータを使用
    const { meta } = await import('@/locales/en/metas/meta')
    return meta.map
  }
}

export default function Page({ params }: Props) {
  const languageResult = Language.create(params.language)
  const language =
    languageResult.isSuccess && languageResult.language
      ? languageResult.language
      : Language.default()

  return <MapPage language={language} />
}
