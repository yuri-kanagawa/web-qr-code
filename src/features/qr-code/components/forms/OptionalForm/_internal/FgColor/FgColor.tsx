import { QrCode } from '@/domains'
import { WarningAlert } from '@/ui/fragments/box'
import { Stack } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { FC } from 'react'

type Props = {
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const FgColor: FC<Props> = ({ qr, onChange }) => {
  const locale = qr.language.locale

  // 前景色と背景色のコントラスト比チェック
  const fgBgContrast = qr.settings.colors.getContrastRatio(
    qr.settings.colors.fgColor,
    qr.settings.colors.bgColor
  )
  const hasLowContrast = fgBgContrast < 3.0

  return (
    <Stack spacing={2}>
      <MuiColorInput
        format="hex"
        value={qr.settings.colors.fgColor.value}
        label={locale.word.qrSettings.fgColor}
        onChange={(value) => {
          const newQr = qr.updateSettings((settings) =>
            settings.changeColors(
              value,
              settings.colors.bgColor.value,
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
          language={qr.language}
          title={locale.word.warnings.foregroundColor}
          messages={[
            locale.word.warningMessages.fgBgContrast(fgBgContrast.toFixed(1))
          ]}
          recommendedText={locale.word.warningMessages.recommendedContrastRatio}
        />
      )}
    </Stack>
  )
}
