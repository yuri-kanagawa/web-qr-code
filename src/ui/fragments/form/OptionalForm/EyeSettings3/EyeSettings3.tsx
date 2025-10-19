import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import {
  EyeRadius,
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
  settings: QrCodeSettings
  onChange: (settings: QrCodeSettings) => void
}

export const EyeSettings3: FC<Props> = ({ language, settings, onChange }) => {
  const { isOverLaptop } = useWindowSize()
  const locale = language.locale

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (
      !isNaN(numValue) &&
      numValue >= EyeRadius.MIN &&
      numValue <= EyeRadius.MAX
    ) {
      const newEye = EyeSettings.create(
        settings.eye.radius1,
        settings.eye.radius2,
        numValue
      )
      const newSettings = settings.changeEye(newEye)
      onChange(newSettings)
    }
  }

  const label = language.isEnglish ? 'Eye (Bottom Left)' : '目（左下）'

  // 目の色のコントラスト比チェック
  const eyeBgContrast = settings.colors.getContrastRatio(
    settings.colors.eyeColor3,
    settings.colors.bgColor
  )
  const eyeFgContrast = settings.colors.getContrastRatio(
    settings.colors.eyeColor3,
    settings.colors.fgColor
  )
  const hasLowContrast = eyeBgContrast < 3.0 || eyeFgContrast < 3.0

  return (
    <FormSection label={label}>
      <Stack spacing={3} sx={{ pb: 3 }}>
        <ColorInput
          format="hex"
          value={settings.colors.eyeColor3.value}
          label={language.isEnglish ? 'Color' : '色'}
          onChange={(value) => {
            const result = QrColor.create(value, language)
            if (result.isSuccess && result.qrColor) {
              const newColors = QrColors.create(
                settings.colors.fgColor,
                settings.colors.bgColor,
                settings.colors.eyeColor1,
                settings.colors.eyeColor2,
                result.qrColor
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
                eyeRadius={[0, 0, settings.eye.radius3]}
                eyeColor={['white', 'white', settings.colors.eyeColor3.value]}
              />
            </CornerHighlightBox>
          </Box>
        )}
        <TextField
          label={language.isEnglish ? 'Corner Radius' : '角の丸み'}
          type="number"
          size="small"
          value={settings.eye.radius3}
          onChange={handleRadiusChange}
          inputProps={{ min: EyeRadius.MIN, max: EyeRadius.MAX }}
          fullWidth
        />
        <Slider
          min={EyeRadius.MIN}
          max={EyeRadius.MAX}
          value={settings.eye.radius3}
          onChange={(event, value) => {
            const numValue = Number(value)
            const newEye = EyeSettings.create(
              settings.eye.radius1,
              settings.eye.radius2,
              numValue
            )
            const newSettings = settings.changeEye(newEye)
            onChange(newSettings)
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
