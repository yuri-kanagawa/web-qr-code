import { Language } from '@/domains/valueObjects/language'
import { useQrCode, useWindowSize } from '@/hooks'
import { Slider, Stack, Typography } from '@mui/material'
import { FC, useMemo } from 'react'

type Props = {
  language: Language
}

export const Size: FC<Props> = ({ language }) => {
  const { height, width } = useWindowSize()
  const { settings, updateSize } = useQrCode()
  const locale = language.getLocale()
  const maxSize = useMemo(() => {
    if (height < width) {
      return height - 150
    }
    return width - 500
  }, [height, width])

  return (
    <Stack spacing={1}>
      <Typography variant="body2" color="text.secondary">
        {locale.word.qrSettings.size}
      </Typography>
      <Slider
        max={maxSize}
        value={settings.size.value}
        min={1}
        onChange={(event, value) => updateSize(Number(value))}
        marks={[
          { value: 1, label: 1 },
          { value: maxSize, label: maxSize }
        ]}
        valueLabelDisplay="auto"
      />
    </Stack>
  )
}
