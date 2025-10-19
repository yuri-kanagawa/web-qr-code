import { Language } from '@/domains/valueObjects/language'
import { RightTopQrFinderPattern } from '@/ui/fragments/qrCode'
import { FC } from 'react'

type Props = {
  language: Language
}

export const EyeColor2: FC<Props> = ({ language }) => {
  const locale = language.locale

  return (
    <RightTopQrFinderPattern
      eyeColor2={settings.colors.eyeColor2.value}
      setEyeColor2={updateEyeColor2}
      label={locale.word.qrSettings.eyeColor2}
      language={language}
    />
  )
}
