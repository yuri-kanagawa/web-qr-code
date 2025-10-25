import { QrCode } from '@/domains'
import { WarningAlert } from '@/ui/fragments/box'
import { ColorInputWithTransparency } from '@/ui/fragments/input'
import { Stack } from '@mui/material'
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

  // 前景色が透過の場合、背景色は透過できない
  const isFgTransparent = qr.settings.colors.fgColor.isTransparent()

  return (
    <Stack spacing={2}>
      <ColorInputWithTransparency
        format="hex"
        value={qr.settings.colors.bgColor.value}
        label={locale.word.qrSettings.bgColor}
        onChange={(value) => {
          console.log('BgColor onChange called with value:', value)
          const newQr = qr.changeBgColor(value)
          console.log('BgColor newQr bgColor:', {
            value: newQr.settings.colors.bgColor.value,
            isTransparent: newQr.settings.colors.bgColor.isTransparent()
          })
          onChange(newQr)
        }}
        isAlphaHidden={true}
        showTransparency={!isFgTransparent}
        transparencyLabel={
          (locale.word.qrSettings as any).transparent || 'Transparent'
        }
        transparentHelpText={
          isFgTransparent
            ? '(前景色が透過のため、背景色は透過できません)'
            : (locale.word.qrSettings as any).transparentHelpText
        }
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
