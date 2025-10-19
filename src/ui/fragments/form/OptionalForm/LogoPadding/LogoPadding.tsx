import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { LogoSettings } from '@/domains/valueObjects/qrSettings'
import { LogoPaddingStyleSelect } from '@/ui/fragments/select'
import { FC } from 'react'

type Props = {
  language: Language
  file: File | null
  settings: QrCodeSettings
  onChange: (settings: QrCodeSettings) => void
}

export const LogoPadding: FC<Props> = ({
  language,
  file,
  settings,
  onChange
}) => {
  const locale = language.locale
  const isDisabled = file === null

  const updateLogoPaddingStyle = (paddingStyle: 'square' | 'circle') => {
    const newLogo = LogoSettings.create({
      width: settings.logo.width,
      height: settings.logo.height,
      opacity: settings.logo.opacity,
      paddingStyle
    })
    const newSettings = settings.changeLogo(newLogo)
    onChange(newSettings)
  }

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
