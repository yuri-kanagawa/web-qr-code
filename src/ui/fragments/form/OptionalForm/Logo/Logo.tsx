import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { WarningAlert } from '@/ui/fragments/box'
import { ImageForm } from '@/ui/fragments/form/OptionalForm/ImageForm/ImageForm'
import { Box, FormLabel, Stack } from '@mui/material'
import { FC } from 'react'

type Props = {
  language: Language
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const Logo: FC<Props> = ({ language, qr, onChange }) => {
  const locale = language.locale
  const file = qr.settings.logoFile

  // ロゴサイズの警告チェック
  const qrSize = qr.settings.size.value
  const logoWidth = qr.settings.logo.width || 0
  const logoHeight = qr.settings.logo.height || 0
  const maxRecommendedSize = Math.floor(qrSize * 0.3) // QRコードサイズの30%を推奨最大値とする（実際のテスト結果に基づく）

  const isLogoTooLarge =
    logoWidth > maxRecommendedSize || logoHeight > maxRecommendedSize
  const logoAreaRatio = (logoWidth * logoHeight) / (qrSize * qrSize)

  const updateLogoWidth = (width: number) => {
    const newQr = qr.updateSettings((settings) =>
      settings.changeLogo(
        width,
        settings.logo.height || 0,
        settings.logo.opacity || 1,
        settings.logo.paddingStyle
      )
    )
    onChange(newQr)
  }

  const updateLogoHeight = (height: number) => {
    const newQr = qr.updateSettings((settings) =>
      settings.changeLogo(
        settings.logo.width || 0,
        height,
        settings.logo.opacity || 1,
        settings.logo.paddingStyle
      )
    )
    onChange(newQr)
  }


  return (
    <Stack spacing={2}>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.23)',
          borderRadius: 1,
          position: 'relative',
          px: 2,
          pt: 3,
          pb: 4,
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.87)'
          }
        }}
      >
        <FormLabel
          sx={{
            position: 'absolute',
            top: -10,
            left: 10,
            px: 0.5,
            bgcolor: 'background.paper',
            fontSize: '0.75rem'
          }}
        >
          {locale.word.qrSettings.logo}
        </FormLabel>
        <ImageForm
          qr={qr}
          onChange={onChange}
          max={qr.settings.size.value}
          language={language}
        />
      </Box>
      {file && isLogoTooLarge && (
        <WarningAlert
          language={language}
          title={language.isEnglish ? 'Logo Size Warning' : 'ロゴサイズ警告'}
          messages={[
            language.isEnglish
              ? `Logo size is too large (${logoWidth}×${logoHeight}px)`
              : `ロゴサイズが大きすぎます (${logoWidth}×${logoHeight}px)`,
            language.isEnglish
              ? `Covers ${(logoAreaRatio * 100).toFixed(1)}% of QR code area`
              : `QRコード領域の${(logoAreaRatio * 100).toFixed(1)}%を覆っています`,
            language.isEnglish
              ? 'Large logos may cover the eye patterns and cause reading failure'
              : '大きなロゴは目の部分を覆い、読み取りに失敗する可能性があります'
          ]}
          recommendedText={
            language.isEnglish
              ? `Recommended size: ${maxRecommendedSize}px or smaller`
              : `推奨サイズ: ${maxRecommendedSize}px以下`
          }
        />
      )}
    </Stack>
  )
}
