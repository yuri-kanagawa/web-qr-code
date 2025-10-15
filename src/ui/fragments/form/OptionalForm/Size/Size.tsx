import React, { FC, useMemo } from 'react'
import { Slider, Stack, TextField } from '@mui/material'
import { useQrCode, useWindowSize } from '@/hooks'

type Props = {}

export const Size: FC<Props> = ({}) => {
  const { height, width } = useWindowSize()
  const { settings, updateSize } = useQrCode()
  const maxSize = useMemo(() => {
    if (height < width) {
      return height - 150
    }
    return width - 500
  }, [height, width])

  return (
    <>
      <Stack>
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
    </>
  )
}
