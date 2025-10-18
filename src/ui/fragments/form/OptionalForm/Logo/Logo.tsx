import { QrCodeSettings } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { LogoSettings } from '@/domains/valueObjects/qrSettings'
import { WarningAlert } from '@/ui/fragments/box'
import { ImageForm } from '@/ui/fragments/form/OptionalForm/ImageForm/ImageForm'
import { Box, FormLabel, Stack } from '@mui/material'
import { FC } from 'react'

type Props = {
  file: File | null
  setFile: (value: File | null) => void
  language: Language
  settings: QrCodeSettings
  onChange: (settings: QrCodeSettings) => void
}

export const Logo: FC<Props> = ({
  file,
  setFile,
  language,
  settings,
  onChange
}) => {
  const locale = language.locale

  // ロゴサイズの警告チェック
  const qrSize = settings.size.value
  const logoWidth = settings.logo.width || 0
  const logoHeight = settings.logo.height || 0
  const maxRecommendedSize = Math.floor(qrSize * 0.3) // QRコードサイズの30%を推奨最大値とする（実際のテスト結果に基づく）

  const isLogoTooLarge =
    logoWidth > maxRecommendedSize || logoHeight > maxRecommendedSize
  const logoAreaRatio = (logoWidth * logoHeight) / (qrSize * qrSize)

  const updateLogoWidth = (width: number) => {
    const newLogo = LogoSettings.create({
      width,
      height: settings.logo.height,
      opacity: settings.logo.opacity,
      paddingStyle: settings.logo.paddingStyle
    })
    const newSettings = settings.changeLogo(newLogo)
    onChange(newSettings)
  }

  const updateLogoHeight = (height: number) => {
    const newLogo = LogoSettings.create({
      width: settings.logo.width,
      height,
      opacity: settings.logo.opacity,
      paddingStyle: settings.logo.paddingStyle
    })
    const newSettings = settings.changeLogo(newLogo)
    onChange(newSettings)
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
          file={file}
          setFile={setFile}
          logHeight={settings.logo.height}
          logWidth={settings.logo.width}
          setLogoHeight={updateLogoHeight}
          setLogoWidth={updateLogoWidth}
          max={settings.size.value}
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
