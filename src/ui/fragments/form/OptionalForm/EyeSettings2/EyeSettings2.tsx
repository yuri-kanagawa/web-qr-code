import { QrCodeSettings } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import {
  EyeRadius,
  EyeSettings,
  QrColor,
  QrColors
} from '@/domains/valueObjects/qrSettings'
import { useWindowSize } from '@/hooks'
import { ColorInput } from '@/ui/cores/input'
import {
  CornerHighlightBox,
  FormSection,
  WarningAlert
} from '@/ui/fragments/box'
import { Box, Slider, Stack, TextField } from '@mui/material'
import { FC } from 'react'
import { QRCode } from 'react-qrcode-logo'

type Props = {
  language: Language
  settings: QrCodeSettings
  onChange: (settings: QrCodeSettings) => void
}

export const EyeSettings2: FC<Props> = ({ language, settings, onChange }) => {
  const { isOverLaptop } = useWindowSize()
  const locale = language.locale

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (
      !isNaN(numValue) &&
      numValue >= EyeRadius.MIN &&
      numValue <= EyeRadius.MAX
    ) {
      const r1 = EyeRadius.create(settings.eye.radius1, language)
      const r2 = EyeRadius.create(numValue, language)
      const r3 = EyeRadius.create(settings.eye.radius3, language)

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

  const label = language.isEnglish ? 'Eye (Top Right)' : '目（右上）'

  // 目の色のコントラスト比チェック
  const eyeBgContrast = settings.colors.getContrastRatio(
    settings.colors.eyeColor2,
    settings.colors.bgColor
  )
  const eyeFgContrast = settings.colors.getContrastRatio(
    settings.colors.eyeColor2,
    settings.colors.fgColor
  )
  const hasLowContrast = eyeBgContrast < 3.0 || eyeFgContrast < 3.0

  return (
    <FormSection label={label}>
      <Stack spacing={3} sx={{ pb: 3 }}>
        <ColorInput
          format="hex"
          value={settings.colors.eyeColor2.value}
          label={language.isEnglish ? 'Color' : '色'}
          onChange={(value) => {
            const result = QrColor.create(value, language)
            if (result.isSuccess && result.qrColor) {
              const newColors = QrColors.create(
                settings.colors.fgColor,
                settings.colors.bgColor,
                settings.colors.eyeColor1,
                result.qrColor,
                settings.colors.eyeColor3
              )
              const newSettings = settings.changeColors(newColors)
              onChange(newSettings)
            }
          }}
          isAlphaHidden={true}
        />
        {isOverLaptop && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CornerHighlightBox width={170} p={2}>
              <QRCode
                value={''}
                size={150}
                bgColor={'white'}
                fgColor={'white'}
                eyeRadius={[0, settings.eye.radius2, 0]}
                eyeColor={['white', settings.colors.eyeColor2.value, 'white']}
              />
            </CornerHighlightBox>
          </Box>
        )}
        <TextField
          label={language.isEnglish ? 'Corner Radius' : '角の丸み'}
          type="number"
          size="small"
          value={settings.eye.radius2}
          onChange={handleRadiusChange}
          inputProps={{ min: EyeRadius.MIN, max: EyeRadius.MAX }}
          fullWidth
        />
        <Slider
          min={EyeRadius.MIN}
          max={EyeRadius.MAX}
          value={settings.eye.radius2}
          onChange={(event, value) => {
            const numValue = Number(value)
            const r1 = EyeRadius.create(settings.eye.radius1, language)
            const r2 = EyeRadius.create(numValue, language)
            const r3 = EyeRadius.create(settings.eye.radius3, language)

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
          }}
          marks={[
            {
              value: EyeRadius.MIN,
              label: '■'
            },
            {
              value: EyeRadius.MAX,
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
