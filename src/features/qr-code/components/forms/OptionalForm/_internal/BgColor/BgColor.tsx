import { QrCode } from '@/domains'
import { WarningAlert } from '@/ui/fragments/box'
import { Stack } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { FC } from 'react'

type Props = {
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const BgColor: FC<Props> = ({ qr, onChange }) => {
  const locale = qr.language.locale

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
          language={qr.language}
          title={locale.word.warnings.backgroundColor}
          messages={[
            locale.word.warningMessages.bgFgContrast(fgBgContrast.toFixed(1))
          ]}
          recommendedText={locale.word.warningMessages.recommendedContrastRatio}
        />
      )}
    </Stack>
  )
}
