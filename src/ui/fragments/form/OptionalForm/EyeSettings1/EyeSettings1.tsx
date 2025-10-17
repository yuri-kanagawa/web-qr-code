import { Language } from '@/domains/valueObjects/language'
import { EyeRadius, QrColor } from '@/domains/valueObjects/qrSettings'
import { useQrCode, useWindowSize } from '@/hooks'
import { ColorInput } from '@/ui/cores/input'
import { QRCode } from '@/ui/cores/QrCode'
import { CornerHighlightBox, FormSection } from '@/ui/fragments/box'
import { Box, Slider, Stack, TextField } from '@mui/material'
import { FC } from 'react'

type Props = {
  language: Language
  isUnified?: boolean
}

export const EyeSettings1: FC<Props> = ({ language, isUnified = false }) => {
  const {
    settings,
    updateEyeColor1,
    updateEyeColor2,
    updateEyeColor3,
    updateEyeRadius1,
    updateEyeRadius2,
    updateEyeRadius3
  } = useQrCode()
  const { isOverLaptop } = useWindowSize()
  const locale = language.locale

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (
      !isNaN(numValue) &&
      numValue >= EyeRadius.MIN &&
      numValue <= EyeRadius.MAX
    ) {
      if (isUnified) {
        // 統一設定モード：すべての目に適用
        updateEyeRadius1(numValue)
        updateEyeRadius2(numValue)
        updateEyeRadius3(numValue)
      } else {
        updateEyeRadius1(numValue)
      }
    }
  }

  const handleColorChange = (value: string) => {
    const result = QrColor.create(value, language)
    if (result.isSuccess && result.qrColor) {
      if (isUnified) {
        // 統一設定モード：すべての目に適用
        updateEyeColor1(result.qrColor)
        updateEyeColor2(result.qrColor)
        updateEyeColor3(result.qrColor)
      } else {
        updateEyeColor1(result.qrColor)
      }
    }
  }

  const handleSliderChange = (event: Event, value: number | number[]) => {
    const numValue = Number(value)
    if (isUnified) {
      // 統一設定モード：すべての目に適用
      updateEyeRadius1(numValue)
      updateEyeRadius2(numValue)
      updateEyeRadius3(numValue)
    } else {
      updateEyeRadius1(numValue)
    }
  }

  const label = isUnified
    ? language.isEnglish
      ? 'Eye Settings'
      : '目の設定'
    : language.isEnglish
      ? 'Eye (Top Left)'
      : '目（左上）'

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
          inputProps={{ min: EyeRadius.MIN, max: EyeRadius.MAX }}
          fullWidth
        />
        <Slider
          min={EyeRadius.MIN}
          max={EyeRadius.MAX}
          value={settings.eye.radius1}
          onChange={handleSliderChange}
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
      </Stack>
    </FormSection>
  )
}
