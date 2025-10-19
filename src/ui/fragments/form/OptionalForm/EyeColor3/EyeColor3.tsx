import { Language } from '@/domains/valueObjects/language'
import { LeftBottomQrFinderPattern } from '@/ui/fragments/qrCode'
import { FC } from 'react'

type Props = {
  language: Language
}

export const EyeColor3: FC<Props> = ({ language }) => {
  const locale = language.locale

  return (
    <LeftBottomQrFinderPattern
      eyeColor3={settings.colors.eyeColor3.value}
      setEyeColor3={updateEyeColor3}
      label={locale.word.qrSettings.eyeColor3}
      language={language}
    />
  )
}
