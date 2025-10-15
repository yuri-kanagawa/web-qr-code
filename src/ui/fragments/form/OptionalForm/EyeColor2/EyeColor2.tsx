import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks'
import { RightTopQrFinderPattern } from '@/ui/fragments/qrCode'
import { FC } from 'react'

type Props = {
  language: Language
}

export const EyeColor2: FC<Props> = ({ language }) => {
  const { settings, updateEyeColor2 } = useQrCode()
  const locale = language.getLocale()

  return (
    <RightTopQrFinderPattern
      eyeColor2={settings.colors.eyeColor2.value}
      setEyeColor2={updateEyeColor2}
      label={locale.word.qrSettings.eyeColor2}
      language={language}
    />
  )
}
