import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { WarningAlert } from '@/ui/fragments/box'
import { EcLevelSelect } from '@/ui/fragments/select'
import { Stack } from '@mui/material'
import { FC } from 'react'

type Props = {
  language: Language
  qr: QrCode
  hasLogo?: boolean
  onChange: (qr: QrCode) => void
}

export const EcLevel: FC<Props> = ({
  language,
  qr,
  hasLogo = false,
  onChange
}) => {
  const locale = language.locale

  // ロゴ使用時のエラー訂正レベル警告
  const isLowEcLevel = qr.ecLevel.value === 'L' || qr.ecLevel.value === 'M'
  const shouldShowWarning = hasLogo && isLowEcLevel

  return (
    <Stack spacing={2}>
      <EcLevelSelect
        value={qr.ecLevel}
        onChange={(newEcLevel) => {
          const newQr = qr.changeEcLevel(newEcLevel.value)
          onChange(newQr)
        }}
        language={language}
        label={locale.word.qrSettings.ecLevel}
      />
      {shouldShowWarning && (
        <WarningAlert
          language={language}
          title={
            language.isEnglish
              ? 'Error Correction Level Warning'
              : 'エラー訂正レベル警告'
          }
          messages={[
            language.isEnglish
              ? `Low error correction level (${qr.ecLevel.value}) with logo may cause reading failure`
              : `低いエラー訂正レベル（${qr.ecLevel.value}）とロゴの組み合わせは読み取りに失敗する可能性があります`
          ]}
          recommendedText={
            language.isEnglish
              ? 'Recommended: Use Q or H level when using logos'
              : '推奨: ロゴ使用時はQまたはHレベルを使用'
          }
        />
      )}
    </Stack>
  )
}
