import { Language } from '@/domains/valueObjects/language'
import { QrColor } from '@/domains/valueObjects/qrSettings'
import { useQrCode } from '@/hooks'
import { MuiColorInput } from 'mui-color-input'
import { FC } from 'react'

type Props = {
  language: Language
}

export const BgColor: FC<Props> = ({ language }) => {
  const { settings, updateBgColor } = useQrCode()
  const locale = language.locale

  return (
    <MuiColorInput
      format="hex"
      value={settings.colors.bgColor.value}
      label={locale.word.qrSettings.bgColor}
      onChange={(value) => {
        const result = QrColor.create(value, language)
        if (result.isSuccess && result.qrColor) {
          updateBgColor(result.qrColor)
        }
      }}
      isAlphaHidden={true}
    />
  )
}
