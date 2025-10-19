import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { LogoPaddingStyleSelect } from '@/ui/fragments/select'
import { FC } from 'react'

type Props = {
  language: Language
  file: File | null
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const LogoPadding: FC<Props> = ({ language, file, qr, onChange }) => {
  const locale = language.locale
  const isDisabled = file === null

  const updateLogoPaddingStyle = (paddingStyle: 'square' | 'circle') => {
    const newQr = qr.changeLogo(
      qr.logo.width || 0,
      qr.logo.height || 0,
      qr.logo.opacity || 1,
      paddingStyle
    )
    onChange(newQr)
  }

  return (
    <LogoPaddingStyleSelect
      value={qr.logo.paddingStyle}
      onChange={updateLogoPaddingStyle}
      language={language}
      label={locale.word.qrSettings.logoPadding}
      disabled={isDisabled}
    />
  )
}
