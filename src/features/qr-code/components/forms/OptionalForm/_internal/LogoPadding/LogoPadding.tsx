import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { LogoPaddingStyleSelect } from '@/features/qr-code'
import { FC } from 'react'

type Props = {
  language: Language
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const LogoPadding: FC<Props> = ({ language, qr, onChange }) => {
  const locale = language.locale
  const file = qr.settings.logoFile
  const isDisabled = file === null

  const updateLogoPaddingStyle = (paddingStyle: 'square' | 'circle') => {
    const newQr = qr.updateSettings((settings) =>
      settings.changeLogo(
        settings.logo.width || 0,
        settings.logo.height || 0,
        settings.logo.opacity || 1,
        paddingStyle
      )
    )
    onChange(newQr)
  }

  return (
    <LogoPaddingStyleSelect
      value={qr.settings.logo.paddingStyle}
      onChange={updateLogoPaddingStyle}
      language={language}
      label={locale.word.qrSettings.logoPadding}
      disabled={isDisabled}
    />
  )
}
