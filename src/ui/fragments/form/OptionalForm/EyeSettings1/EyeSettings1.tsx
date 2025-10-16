import { Language } from '@/domains/valueObjects/language'
import { EyeRadius, QrColor } from '@/domains/valueObjects/qrSettings'
import { useQrCode, useWindowSize } from '@/hooks'
import { ColorInput } from '@/ui/cores/input'
import { QRCode } from '@/ui/cores/QrCode'
import { CornerHighlightBox } from '@/ui/fragments/box'
import { Box, FormLabel, Slider, Stack, TextField } from '@mui/material'
import { FC, useEffect, useRef, useState } from 'react'

type Props = {
  language: Language
}

export const EyeSettings1: FC<Props> = ({ language }) => {
  const { settings, updateEyeColor1, updateEyeRadius1 } = useQrCode()
  const { isOverLaptop } = useWindowSize()
  const locale = language.getLocale()

  const [radiusInput, setRadiusInput] = useState(
    settings.eye.radius1.toString()
  )
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setRadiusInput(settings.eye.radius1.toString())
  }, [settings.eye.radius1])

  const handleRadiusInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setRadiusInput(value)

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    const numValue = Number(value)
    if (
      !isNaN(numValue) &&
      numValue >= EyeRadius.MIN &&
      numValue <= EyeRadius.MAX
    ) {
      debounceTimerRef.current = setTimeout(() => {
        updateEyeRadius1(numValue)
      }, 500)
    }
  }

  const handleRadiusBlur = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }

    const numValue = Number(radiusInput)
    if (
      !isNaN(numValue) &&
      numValue >= EyeRadius.MIN &&
      numValue <= EyeRadius.MAX
    ) {
      updateEyeRadius1(numValue)
    } else {
      setRadiusInput(settings.eye.radius1.toString())
    }
  }

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
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
          <CornerHighlightBox width={170} p={2}>
            <QRCode
              value={''}
              bgColor={'white'}
              fgColor={'white'}
              eyeRadius={[settings.eye.radius1, 0, 0]}
              eyeColor={[settings.colors.eyeColor1.value, 'white', 'white']}
            />
          </CornerHighlightBox>
        )}
        <TextField
          label={language.isEnglish ? 'Corner Radius' : '角の丸み'}
          type="number"
          size="small"
          value={radiusInput}
          onChange={handleRadiusInputChange}
          onBlur={handleRadiusBlur}
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
              label: language.isEnglish ? 'Square' : '四角'
            },
            {
              value: EyeRadius.MAX,
              label: language.isEnglish ? 'Round' : '丸'
            }
          ]}
          valueLabelDisplay="auto"
        />
      </Stack>
    </Box>
  )
}
