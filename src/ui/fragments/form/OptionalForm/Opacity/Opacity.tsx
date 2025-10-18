import { QrCodeSettings } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { LogoSettings } from '@/domains/valueObjects/qrSettings'
import { Step01Slider } from '@/ui/fragments/slider'
import { Box, FormLabel, Stack, TextField } from '@mui/material'
import { FC } from 'react'

type Props = {
  file: File | null
  language: Language
  settings: QrCodeSettings
  onChange: (settings: QrCodeSettings) => void
}

export const Opacity: FC<Props> = ({ file, language, settings, onChange }) => {
  const isRelationFileDisabled = file == null
  const locale = language.locale

  const updateLogoOpacity = (opacity: number) => {
    const newLogo = LogoSettings.create({
      width: settings.logo.width,
      height: settings.logo.height,
      opacity,
      paddingStyle: settings.logo.paddingStyle
    })
    const newSettings = settings.changeLogo(newLogo)
    onChange(newSettings)
  }

  const handleOpacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 1) {
      updateLogoOpacity(numValue)
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
        {locale.word.qrSettings.opacity}
      </FormLabel>
      <Stack spacing={3}>
        <TextField
          label={language.isEnglish ? 'Current Opacity' : '現在の透明度'}
          type="number"
          size="small"
          value={settings.logo.opacity ?? 1}
          onChange={handleOpacityChange}
          disabled={isRelationFileDisabled}
          inputProps={{ min: 0, max: 1, step: 0.1 }}
          fullWidth
        />
        <Step01Slider
          min={0}
          max={1}
          disabled={isRelationFileDisabled}
          value={settings.logo.opacity ?? 1}
          onChange={updateLogoOpacity}
          marks={[
            { value: 0, label: 0 },
            { value: 1, label: 1 }
          ]}
          valueLabelDisplay={'auto'}
        />
      </Stack>
    </Box>
  )
}
