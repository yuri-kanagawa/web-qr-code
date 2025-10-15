import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks'
import { LogoPaddingStyleSelect } from '@/ui/fragments/select'
import { FC } from 'react'

type Props = {
  language: Language
  file: File | null
}

export const LogoPadding: FC<Props> = ({ language, file }) => {
  const { settings, updateLogoPaddingStyle } = useQrCode()
  const locale = language.getLocale()
  const isDisabled = file === null

  return (
    <LogoPaddingStyleSelect
      value={settings.logo.paddingStyle}
      onChange={updateLogoPaddingStyle}
      language={language}
      label={locale.word.qrSettings.logoPadding}
      disabled={isDisabled}
    />
  )
}
