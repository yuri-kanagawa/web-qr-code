import { QrCode } from '@/domains'
import { EcLevelSelect } from '@/features/qr-code'
import { WarningAlert } from '@/ui/fragments/box'
import { Stack } from '@mui/material'
import { FC } from 'react'

type Props = {
  qr: QrCode
  hasLogo?: boolean
  onChange: (qr: QrCode) => void
}

export const EcLevel: FC<Props> = ({ qr, hasLogo = false, onChange }) => {
  const locale = qr.language.locale

  // ロゴ使用時のエラー訂正レベル警告
  const isLowEcLevel =
    qr.settings.ecLevel.value === 'L' || qr.settings.ecLevel.value === 'M'
  const shouldShowWarning = hasLogo && isLowEcLevel

  return (
    <Stack spacing={2}>
      <EcLevelSelect
        value={qr.settings.ecLevel}
        onChange={(newEcLevel) => {
          const newQr = qr.updateSettings((settings) =>
            settings.changeEcLevel(newEcLevel.value)
          )
          onChange(newQr)
        }}
        language={qr.language}
        label={locale.word.qrSettings.ecLevel}
      />
      {shouldShowWarning && (
        <WarningAlert
          language={qr.language}
          title={locale.word.warnings.errorCorrectionLevel}
          messages={[
            locale.word.warningMessages.lowEcLevelWithLogo(
              qr.settings.ecLevel.value
            )
          ]}
          recommendedText={locale.word.warningMessages.recommendedEcLevel}
        />
      )}
    </Stack>
  )
}
