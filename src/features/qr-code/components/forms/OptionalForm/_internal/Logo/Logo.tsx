import { QrCode } from '@/domains'
import { WarningAlert } from '@/ui/fragments/box'
import { Box, FormLabel, Stack } from '@mui/material'
import { FC } from 'react'
import { ImageForm } from '../ImageForm/ImageForm'

type Props = {
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const Logo: FC<Props> = ({ qr, onChange }) => {
  const locale = qr.language.locale
  const file = qr.settings.logoFile

  // ロゴサイズの警告チェック（パーセンテージベース）
  const logoWidthPercent = qr.settings.logo.width || 0
  const logoHeightPercent = qr.settings.logo.height || 0
  const maxRecommendedPercent = 30 // 30%を推奨最大値とする

  const isLogoTooLarge =
    logoWidthPercent > maxRecommendedPercent ||
    logoHeightPercent > maxRecommendedPercent
  const logoAreaRatio = (logoWidthPercent * logoHeightPercent) / 10000 // パーセンテージの積を10000で割って比率を計算

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
        <ImageForm qr={qr} onChange={onChange} max={30} />
      </Box>
      {file && isLogoTooLarge && (
        <WarningAlert
          language={qr.language}
          title={locale.word.warnings.logoSize}
          messages={[
            qr.language.isEnglish
              ? `Logo size is too large (${logoWidthPercent}%×${logoHeightPercent}%)`
              : `ロゴサイズが大きすぎます (${logoWidthPercent}%×${logoHeightPercent}%)`,
            qr.language.isEnglish
              ? `Covers ${logoAreaRatio.toFixed(1)}% of QR code area`
              : `QRコード領域の${logoAreaRatio.toFixed(1)}%を覆っています`,
            qr.language.isEnglish
              ? 'Large logos may cover the eye patterns and cause reading failure'
              : '大きなロゴは目の部分を覆い、読み取りに失敗する可能性があります'
          ]}
          recommendedText={
            qr.language.isEnglish
              ? `Recommended size: ${maxRecommendedPercent}% or smaller`
              : `推奨サイズ: ${maxRecommendedPercent}%以下`
          }
        />
      )}
    </Stack>
  )
}
