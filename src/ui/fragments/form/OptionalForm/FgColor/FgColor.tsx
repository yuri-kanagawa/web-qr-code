import { Language } from '@/domains/valueObjects/language'
import { QrColor } from '@/domains/valueObjects/qrSettings'
import { useQrCode } from '@/hooks'
import { MuiColorInput } from 'mui-color-input'
import { FC } from 'react'

type Props = {
  language: Language
}

export const FgColor: FC<Props> = ({ language }) => {
  const { settings, updateFgColor } = useQrCode()
  const locale = language.getLocale()

  return (
    <MuiColorInput
      format="hex"
      value={settings.colors.fgColor.value}
      label={locale.word.qrSettings.fgColor}
      onChange={(value) => {
        const result = QrColor.create(value, language)
        if (result.isSuccess && result.qrColor) {
          updateFgColor(result.qrColor)
        }
      }}
      isAlphaHidden={true}
    />
  )
}
