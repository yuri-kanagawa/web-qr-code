import { QrCode } from '@/domains'
import { EyeRadius } from '@/domains/valueObjects/qrSettings'
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
  
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const EyeSettings2: FC<Props> = ({ qr, onChange }) => {
  const { isOverLaptop } = useWindowSize()
  const locale = qr.qr.language.locale

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (
      !isNaN(numValue) &&
      numValue >= EyeRadius.MIN &&
      numValue <= EyeRadius.MAX
    ) {
      const newQr = qr.changeEye(qr.eye.radius1, numValue, qr.eye.radius3)
      onChange(newQr)
    }
  }

  const label = qr.language.isEnglish ? 'Eye (Top Right)' : '目（右上）'

  // 目の色のコントラスト比チェック
  const contrastInfo = qr.getRightTopEyeContrastInfo()

  return (
    <FormSection label={label}>
      <Stack spacing={3} sx={{ pb: 3 }}>
        <ColorInput
          format="hex"
          value={qr.colors.eyeColor2.value}
          label={qr.language.isEnglish ? 'Color' : '色'}
          onChange={(value) => {
            const newQr = qr.changeColors(
              qr.colors.fgColor.value,
              qr.colors.bgColor.value,
              qr.colors.eyeColor1.value,
              value,
              qr.colors.eyeColor3.value
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
                eyeRadius={[0, qr.eye.radius2, 0]}
                eyeColor={['white', qr.colors.eyeColor2.value, 'white']}
              />
            </CornerHighlightBox>
          </Box>
        )}
        <TextField
          label={qr.language.isEnglish ? 'Corner Radius' : '角の丸み'}
          type="number"
          size="small"
          value={qr.eye.radius2}
          onChange={handleRadiusChange}
          inputProps={{ min: EyeRadius.MIN, max: EyeRadius.MAX }}
          fullWidth
        />
        <Slider
          min={EyeRadius.MIN}
          max={EyeRadius.MAX}
          value={qr.eye.radius2}
          onChange={(event, value) => {
            const numValue = Number(value)
            const newQr = qr.changeEye(qr.eye.radius1, numValue, qr.eye.radius3)
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
            title={qr.language.isEnglish ? 'Eye Color Warning' : '目の色警告'}
            messages={contrastInfo.warningMessages}
            recommendedText={
              qr.language.isEnglish
                ? 'Recommended contrast ratio: 3.0:1 or higher'
                : '推奨コントラスト比: 3.0:1以上'
            }
          />
        )}
      </Stack>
    </FormSection>
  )
}
