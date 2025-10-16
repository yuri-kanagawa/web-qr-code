import { Language } from '@/domains/valueObjects/language'
import { EyeRadius, QrColor } from '@/domains/valueObjects/qrSettings'
import { useQrCode, useWindowSize } from '@/hooks'
import { ColorInput } from '@/ui/cores/input'
import { QRCode } from '@/ui/cores/QrCode'
import { CornerHighlightBox } from '@/ui/fragments/box'
import { Box, FormLabel, Slider, Stack, TextField } from '@mui/material'
import { FC } from 'react'

type Props = {
  language: Language
}

export const EyeSettings1: FC<Props> = ({ language }) => {
  const { settings, updateEyeColor1, updateEyeRadius1 } = useQrCode()
  const { isOverLaptop } = useWindowSize()
  const locale = language.getLocale()

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (
      !isNaN(numValue) &&
      numValue >= EyeRadius.MIN &&
      numValue <= EyeRadius.MAX
    ) {
      updateEyeRadius1(numValue)
    }
  }

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        borderRadius: 1,
        position: 'relative',
        px: 2,
        pt: 3,
        pb: 5,
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
        {language.isEnglish ? 'Eye (Top Left)' : '目（左上）'}
      </FormLabel>
      <Stack spacing={3}>
        <ColorInput
          format="hex"
          value={settings.colors.eyeColor1.value}
          label={language.isEnglish ? 'Color' : '色'}
          onChange={(value) => {
            const result = QrColor.create(value, language)
            if (result.isSuccess && result.qrColor) {
              updateEyeColor1(result.qrColor)
            }
          }}
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
          onChange={(event, value) => updateEyeRadius1(Number(value))}
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
    </Box>
  )
}
