import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks'
import { Step01Slider } from '@/ui/fragments/slider'
import { Stack, Typography } from '@mui/material'
import { FC } from 'react'

type Props = {
  file: File | null
  language: Language
}

export const Opacity: FC<Props> = ({ file, language }) => {
  const isRelationFileDisabled = file == null
  const { settings, updateLogoOpacity } = useQrCode()
  const locale = language.getLocale()

  return (
    <Stack spacing={1}>
      <Typography variant="body2" color="text.secondary">
        {locale.word.qrSettings.opacity}
      </Typography>
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
  )
}
