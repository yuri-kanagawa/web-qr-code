import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { EyeRadius } from '@/domains/valueObjects/qrSettings'
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
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const EyeSettings3: FC<Props> = ({ language, qr, onChange }) => {
  const { isOverLaptop } = useWindowSize()
  const locale = language.locale

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (
      !isNaN(numValue) &&
      numValue >= EyeRadius.MIN &&
      numValue <= EyeRadius.MAX
    ) {
      const newQr = qr.changeEye(qr.eye.radius1, qr.eye.radius2, numValue)
      onChange(newQr)
    }
  }

  const label = language.isEnglish ? 'Eye (Bottom Left)' : '目（左下）'

  // 目の色のコントラスト比チェック
  const contrastInfo = qr.getLeftBottomEyeContrastInfo()

  return (
    <FormSection label={label}>
      <Stack spacing={3} sx={{ pb: 3 }}>
        <ColorInput
          format="hex"
          value={qr.colors.eyeColor3.value}
          label={language.isEnglish ? 'Color' : '色'}
          onChange={(value) => {
            const newQr = qr.changeColors(
              qr.colors.fgColor.value,
              qr.colors.bgColor.value,
              qr.colors.eyeColor1.value,
              qr.colors.eyeColor2.value,
              value
            )
            onChange(newQr)
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
                eyeRadius={[0, 0, qr.eye.radius3]}
                eyeColor={['white', 'white', qr.colors.eyeColor3.value]}
              />
            </CornerHighlightBox>
          </Box>
        )}
        <TextField
          label={language.isEnglish ? 'Corner Radius' : '角の丸み'}
          type="number"
          size="small"
          value={qr.eye.radius3}
          onChange={handleRadiusChange}
          inputProps={{ min: EyeRadius.MIN, max: EyeRadius.MAX }}
          fullWidth
        />
        <Slider
          min={EyeRadius.MIN}
          max={EyeRadius.MAX}
          value={qr.eye.radius3}
          onChange={(event, value) => {
            const numValue = Number(value)
            const newQr = qr.changeEye(qr.eye.radius1, qr.eye.radius2, numValue)
            onChange(newQr)
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
        {contrastInfo.hasLowContrast && (
          <WarningAlert
            language={language}
            title={language.isEnglish ? 'Eye Color Warning' : '目の色警告'}
            messages={contrastInfo.warningMessages}
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
