import { Language } from '@/domains/valueObjects/language'
import { LeftTopQrFinderPattern } from '@/ui/fragments/qrCode'
import { FC } from 'react'

type Props = {
  language: Language
}

export const EyeColor1: FC<Props> = ({ language }) => {
  const locale = language.locale

  return (
    <LeftTopQrFinderPattern
      eyeColor1={settings.colors.eyeColor1.value}
      setEyeColor1={updateEyeColor1}
      label={locale.word.qrSettings.eyeColor1}
      language={language}
    />
  )
}
