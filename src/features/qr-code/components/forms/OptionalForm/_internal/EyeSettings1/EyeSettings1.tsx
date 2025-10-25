import { QrCode } from '@/domains'
import { EyeRadius as EyeRadiusClass } from '@/domains/valueObjects/qrSettings'
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
  isUnified?: boolean
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const EyeSettings1: FC<Props> = ({
  isUnified = false,
  qr,
  onChange
}) => {
  const { isOverLaptop } = useWindowSize()
  const locale = qr.language.locale
  const isBgTransparent = qr.settings.colors.bgColor.isTransparent()

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (
      !isNaN(numValue) &&
      numValue >= EyeRadiusClass.MIN &&
      numValue <= EyeRadiusClass.MAX
    ) {
      if (isUnified) {
        // 統一設定モード：すべての目に適用
        const newQr = qr.updateSettings((settings) =>
          settings.changeEye(numValue, numValue, numValue)
        )
        onChange(newQr)
      } else {
        const newQr = qr.updateSettings((settings) =>
          settings.changeEye(
            numValue,
            settings.eye.radius2,
            settings.eye.radius3
          )
        )
        onChange(newQr)
      }
    }
  }

  const handleColorChange = (value: string) => {
    if (isUnified) {
      // 統一設定モード：すべての目に適用
      const newQr = qr.updateSettings((settings) =>
        settings.changeColors(
          settings.colors.fgColor.value,
          settings.colors.bgColor.value,
          value,
          value,
          value
        )
      )
      onChange(newQr)
    } else {
      const newQr = qr.updateSettings((settings) =>
        settings.changeColors(
          settings.colors.fgColor.value,
          settings.colors.bgColor.value,
          value,
          settings.colors.eyeColor2.value,
          settings.colors.eyeColor3.value
        )
      )
      onChange(newQr)
    }
  }

  const handleSliderChange = (event: Event, value: number | number[]) => {
    const numValue = Number(value)
    if (isUnified) {
      // 統一設定モード：すべての目に適用
      const newQr = qr.updateSettings((settings) =>
        settings.changeEye(numValue, numValue, numValue)
      )
      onChange(newQr)
    } else {
      const newQr = qr.updateSettings((settings) =>
        settings.changeEye(numValue, settings.eye.radius2, settings.eye.radius3)
      )
      onChange(newQr)
    }
  }

  const label = isUnified
    ? locale.word.formSections.eyeSettings
    : locale.word.formSections.eyeTopLeft

  // 目の色のコントラスト比チェック
  const contrastInfo = qr.getLeftTopEyeContrastInfo()

  return (
    <FormSection label={label}>
      <Stack spacing={3} sx={{ pb: 3 }}>
        <ColorInput
          format="hex"
          value={qr.settings.colors.eyeColor1.value}
          label={locale.word.qrSettingsLabels.color}
          onChange={handleColorChange}
          isAlphaHidden={true}
          disabled={isBgTransparent}
        />
        {isOverLaptop && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CornerHighlightBox width={170} p={2}>
              <QRCode
                value={''}
                bgColor={'white'}
                fgColor={'white'}
                eyeRadius={[qr.settings.eye.radius1, 0, 0]}
                eyeColor={[
                  qr.settings.colors.eyeColor1.value,
                  'white',
                  'white'
                ]}
              />
            </CornerHighlightBox>
          </Box>
        )}
        <TextField
          label={locale.word.qrSettingsLabels.cornerRadius}
          type="number"
          size="small"
          value={qr.settings.eye.radius1}
          onChange={handleRadiusChange}
          inputProps={{ min: EyeRadiusClass.MIN, max: EyeRadiusClass.MAX }}
          fullWidth
        />
        <Slider
          min={EyeRadiusClass.MIN}
          max={EyeRadiusClass.MAX}
          value={qr.settings.eye.radius1}
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
        {contrastInfo.hasLowContrast && (
          <WarningAlert
            language={qr.language}
            title={locale.word.warnings.eyeColor}
            messages={contrastInfo.warningMessages}
            recommendedText={
              locale.word.warningMessages.recommendedContrastRatio
            }
          />
        )}
      </Stack>
    </FormSection>
  )
}
