import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { WarningAlert } from '@/ui/fragments/box'
import { Stack } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { FC } from 'react'

type Props = {
  language: Language
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const BgColor: FC<Props> = ({ language, qr, onChange }) => {
  const locale = language.locale

  // 背景色と前景色のコントラスト比チェック
  const fgBgContrast = qr.settings.colors.getContrastRatio(
    qr.settings.colors.fgColor,
    qr.settings.colors.bgColor
  )
  const hasLowContrast = fgBgContrast < 3.0

  return (
    <Stack spacing={2}>
      <MuiColorInput
        format="hex"
        value={qr.settings.colors.bgColor.value}
        label={locale.word.qrSettings.bgColor}
        onChange={(value) => {
          const newQr = qr.updateSettings((settings) =>
            settings.changeColors(
              settings.colors.fgColor.value,
              value,
              settings.colors.eyeColor1.value,
              settings.colors.eyeColor2.value,
              settings.colors.eyeColor3.value
            )
          )
          onChange(newQr)
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
