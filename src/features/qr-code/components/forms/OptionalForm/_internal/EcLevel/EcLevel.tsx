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

export const EcLevel: FC<Props> = ({
  
  qr,
  hasLogo = false,
  onChange
}) => {
  const locale = qr.qr.language.locale

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
        language={language}
        label={locale.word.qrSettings.ecLevel}
      />
      {shouldShowWarning && (
        <WarningAlert
          language={language}
          title={
            qr.language.isEnglish
              ? 'Error Correction Level Warning'
              : 'エラー訂正レベル警告'
          }
          messages={[
            qr.language.isEnglish
              ? `Low error correction level (${qr.settings.ecLevel.value}) with logo may cause reading failure`
              : `低いエラー訂正レベル（${qr.settings.ecLevel.value}）とロゴの組み合わせは読み取りに失敗する可能性があります`
          ]}
          recommendedText={
            qr.language.isEnglish
              ? 'Recommended: Use Q or H level when using logos'
              : '推奨: ロゴ使用時はQまたはHレベルを使用'
          }
        />
      )}
    </Stack>
  )
}
