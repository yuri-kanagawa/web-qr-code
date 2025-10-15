'use client'
import { Language } from '@/domains'
import { Page as RootPage } from '@/ui/pages/root'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  console.log('[language]/page.tsx - params.language:', params.language)
  const languageResult = Language.create(params.language)
  console.log('[language]/page.tsx - languageResult:', languageResult)
  const language =
    languageResult.isSuccess && languageResult.language
      ? languageResult.language
      : Language.default()
  console.log('[language]/page.tsx - final language:', language.value)

  return <RootPage language={language} />
}
