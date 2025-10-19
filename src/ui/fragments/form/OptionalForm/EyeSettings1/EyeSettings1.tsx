import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import {
  EyeRadius as EyeRadiusClass,
  EyeSettings,
  QrColor,
  QrColors
} from '@/domains/valueObjects/qrSettings'
import { useWindowSize } from '@/hooks'
import { ColorInput } from '@/ui/cores/input'
import { QRCode } from '@/ui/cores/QrCode'
import {
  CornerHighlightBox,
  FormSection,
  WarningAlert
} from '@/ui/fragments/box'
import { Box, Slider, Stack, TextField } from '@mui/material'
import { FC } from 'react'

type Props = {
  language: Language
  isUnified?: boolean
  settings: QrCodeSettings
  onChange: (settings: QrCodeSettings) => void
}

export const EyeSettings1: FC<Props> = ({
  language,
  isUnified = false,
  settings,
  onChange
}) => {
  const { isOverLaptop } = useWindowSize()
  const locale = language.locale

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (
      !isNaN(numValue) &&
      numValue >= EyeRadiusClass.MIN &&
      numValue <= EyeRadiusClass.MAX
    ) {
      if (isUnified) {
        // 統一設定モード：すべての目に適用
        const r1 = EyeRadiusClass.create(numValue, language)
        const r2 = EyeRadiusClass.create(numValue, language)
        const r3 = EyeRadiusClass.create(numValue, language)
        if (
          r1.isSuccess &&
          r2.isSuccess &&
          r3.isSuccess &&
          r1.eyeRadius &&
          r2.eyeRadius &&
          r3.eyeRadius
        ) {
          const newEye = EyeSettings.create(
            r1.eyeRadius,
            r2.eyeRadius,
            r3.eyeRadius
          )
          const newSettings = settings.changeEye(newEye)
          onChange(newSettings)
        }
      } else {
        const r1 = EyeRadiusClass.create(numValue, language)
        const r2 = EyeRadiusClass.create(settings.eye.radius2, language)
        const r3 = EyeRadiusClass.create(settings.eye.radius3, language)
        if (
          r1.isSuccess &&
          r2.isSuccess &&
          r3.isSuccess &&
          r1.eyeRadius &&
          r2.eyeRadius &&
          r3.eyeRadius
        ) {
          const newEye = EyeSettings.create(
            r1.eyeRadius,
            r2.eyeRadius,
            r3.eyeRadius
          )
          const newSettings = settings.changeEye(newEye)
          onChange(newSettings)
        }
      }
    }
  }

  const handleColorChange = (value: string) => {
    const result = QrColor.create(value, language)
    if (result.isSuccess && result.qrColor) {
      if (isUnified) {
        // 統一設定モード：すべての目に適用
        const newColors = QrColors.create(
          settings.colors.fgColor,
          settings.colors.bgColor,
          result.qrColor,
          result.qrColor,
          result.qrColor
        )
        const newSettings = settings.changeColors(newColors)
        onChange(newSettings)
      } else {
        const newColors = QrColors.create(
          settings.colors.fgColor,
          settings.colors.bgColor,
          result.qrColor,
          settings.colors.eyeColor2,
          settings.colors.eyeColor3
        )
        const newSettings = settings.changeColors(newColors)
        onChange(newSettings)
      }
    }
  }

  const handleSliderChange = (event: Event, value: number | number[]) => {
    const numValue = Number(value)
    if (isUnified) {
      // 統一設定モード：すべての目に適用
      const r1 = EyeRadiusClass.create(numValue, language)
      const r2 = EyeRadiusClass.create(numValue, language)
      const r3 = EyeRadiusClass.create(numValue, language)
      if (
        r1.isSuccess &&
        r2.isSuccess &&
        r3.isSuccess &&
        r1.eyeRadius &&
        r2.eyeRadius &&
        r3.eyeRadius
      ) {
        const newEye = EyeSettings.create(
          r1.eyeRadius,
          r2.eyeRadius,
          r3.eyeRadius
        )
        const newSettings = settings.changeEye(newEye)
        onChange(newSettings)
      }
    } else {
      const r1 = EyeRadiusClass.create(numValue, language)
      const r2 = EyeRadiusClass.create(settings.eye.radius2, language)
      const r3 = EyeRadiusClass.create(settings.eye.radius3, language)
      if (
        r1.isSuccess &&
        r2.isSuccess &&
        r3.isSuccess &&
        r1.eyeRadius &&
        r2.eyeRadius &&
        r3.eyeRadius
      ) {
        const newEye = EyeSettings.create(
          r1.eyeRadius,
          r2.eyeRadius,
          r3.eyeRadius
        )
        const newSettings = settings.changeEye(newEye)
        onChange(newSettings)
      }
    }
  }

  const label = isUnified
    ? language.isEnglish
      ? 'Eye Settings'
      : '目の設定'
    : language.isEnglish
      ? 'Eye (Top Left)'
      : '目（左上）'

  // 目の色のコントラスト比チェック
  const eyeBgContrast = settings.colors.getContrastRatio(
    settings.colors.eyeColor1,
    settings.colors.bgColor
  )
  const eyeFgContrast = settings.colors.getContrastRatio(
    settings.colors.eyeColor1,
    settings.colors.fgColor
  )
  const hasLowContrast = eyeBgContrast < 3.0 || eyeFgContrast < 3.0

  return (
    <FormSection label={label}>
      <Stack spacing={3} sx={{ pb: 3 }}>
        <ColorInput
          format="hex"
          value={settings.colors.eyeColor1.value}
          label={language.isEnglish ? 'Color' : '色'}
          onChange={handleColorChange}
          isAlphaHidden={true}
        />
        {isOverLaptop && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CornerHighlightBox width={170} p={2}>
              <QRCode
                value={''}
                bgColor={'white'}
                fgColor={'white'}
                eyeRadius={[settings.eye.radius1, 0, 0]}
                eyeColor={[settings.colors.eyeColor1.value, 'white', 'white']}
              />
            </CornerHighlightBox>
          </Box>
        )}
        <TextField
          label={language.isEnglish ? 'Corner Radius' : '角の丸み'}
          type="number"
          size="small"
          value={settings.eye.radius1}
          onChange={handleRadiusChange}
          inputProps={{ min: EyeRadiusClass.MIN, max: EyeRadiusClass.MAX }}
          fullWidth
        />
        <Slider
          min={EyeRadiusClass.MIN}
          max={EyeRadiusClass.MAX}
          value={settings.eye.radius1}
          onChange={handleSliderChange}
          marks={[
            {
              value: EyeRadiusClass.MIN,
              label: '■'
            },
            {
              value: EyeRadiusClass.MAX,
              label: '●'
            }
          ]}
          valueLabelDisplay="auto"
          sx={{
            '& .MuiSlider-markLabel': {
              fontSize: '1.5rem'
            }
          }}
        />
        {hasLowContrast && (
          <WarningAlert
            language={language}
            title={language.isEnglish ? 'Eye Color Warning' : '目の色警告'}
            messages={[
              ...(eyeBgContrast < 3.0
                ? [
                    language.isEnglish
                      ? `Eye color has low contrast with background (${eyeBgContrast.toFixed(1)}:1)`
                      : `目の色と背景色のコントラスト比が低いです (${eyeBgContrast.toFixed(1)}:1)`
                  ]
                : []),
              ...(eyeFgContrast < 3.0
                ? [
                    language.isEnglish
                      ? `Eye color has low contrast with foreground (${eyeFgContrast.toFixed(1)}:1)`
                      : `目の色と前景色のコントラスト比が低いです (${eyeFgContrast.toFixed(1)}:1)`
                  ]
                : [])
            ]}
            recommendedText={
              language.isEnglish
                ? 'Recommended contrast ratio: 3.0:1 or higher'
                : '推奨コントラスト比: 3.0:1以上'
            }
          />
        )}
      </Stack>
    </FormSection>
  )
}
