import { QrCodeSettings } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { QrColor, QrColors } from '@/domains/valueObjects/qrSettings'
import { WarningAlert } from '@/ui/fragments/box'
import { Stack } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { FC } from 'react'

type Props = {
  language: Language
  settings: QrCodeSettings
  onChange: (settings: QrCodeSettings) => void
}

export const BgColor: FC<Props> = ({ language, settings, onChange }) => {
  const locale = language.locale

  // 背景色と前景色のコントラスト比チェック
  const fgBgContrast = settings.colors.getContrastRatio(
    settings.colors.fgColor,
    settings.colors.bgColor
  )
  const hasLowContrast = fgBgContrast < 3.0

  return (
    <Stack spacing={2}>
      <MuiColorInput
        format="hex"
        value={settings.colors.bgColor.value}
        label={locale.word.qrSettings.bgColor}
        onChange={(value) => {
          const result = QrColor.create(value, language)
          if (result.isSuccess && result.qrColor) {
            const newColors = QrColors.create(
              settings.colors.fgColor,
              result.qrColor,
              settings.colors.eyeColor1,
              settings.colors.eyeColor2,
              settings.colors.eyeColor3
            )
            const newSettings = settings.changeColors(newColors)
            onChange(newSettings)
          }
        }}
        isAlphaHidden={true}
      />
      {hasLowContrast && (
        <WarningAlert
          language={language}
          title={language.isEnglish ? 'Background Color Warning' : '背景色警告'}
          messages={[
            language.isEnglish
              ? `Low contrast with foreground color (${fgBgContrast.toFixed(1)}:1)`
              : `前景色とのコントラスト比が低いです (${fgBgContrast.toFixed(1)}:1)`
          ]}
          recommendedText={
            language.isEnglish
              ? 'Recommended contrast ratio: 3.0:1 or higher'
              : '推奨コントラスト比: 3.0:1以上'
          }
        />
      )}
    </Stack>
  )
}
