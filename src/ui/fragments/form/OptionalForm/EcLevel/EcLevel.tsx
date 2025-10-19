import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { WarningAlert } from '@/ui/fragments/box'
import { EcLevelSelect } from '@/ui/fragments/select'
import { Stack } from '@mui/material'
import { FC } from 'react'

type Props = {
  language: Language
  settings: QrCodeSettings
  onChange: (settings: QrCodeSettings) => void
  hasLogo?: boolean
}

export const EcLevel: FC<Props> = ({
  language,
  settings,
  onChange,
  hasLogo = false
}) => {
  const locale = language.locale

  // ロゴ使用時のエラー訂正レベル警告
  const isLowEcLevel =
    settings.ecLevel.value === 'L' || settings.ecLevel.value === 'M'
  const shouldShowWarning = hasLogo && isLowEcLevel

  return (
    <Stack spacing={2}>
      <EcLevelSelect
        value={settings.ecLevel}
        onChange={(newEcLevel) => {
          const newSettings = settings.changeEcLevel(newEcLevel)
          onChange(newSettings)
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
              ? `Low error correction level (${settings.ecLevel.value}) with logo may cause reading failure`
              : `低いエラー訂正レベル（${settings.ecLevel.value}）とロゴの組み合わせは読み取りに失敗する可能性があります`
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
