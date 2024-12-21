import React, { FC, useState } from 'react'
import { Box, Grid, Input, Slider, Stack, Typography } from '@mui/material'
import { VolumeUp } from '@mui/icons-material'

type Props = {
  children: React.ReactNode
  width: number
  height: number
}

export const HeightSlider: FC<Props> = ({ height, width, children }) => {
  const [value, setValue] = useState(30)

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value))
  }

  const handleBlur = () => {
    if (value < 0) {
      setValue(0)
    } else if (value > 100) {
      setValue(100)
    }
  }

  return (
    <Stack sx={{ width: 250, height: height }} spacing={2}>
      <Box px={1}>
        <Input
          sx={{ width: 50 }}
          value={value}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 1,
            min: 0,
            max: 100,
            type: 'number'
            // 'aria-labelledby': 'input-slider'
          }}
        />
      </Box>
      <Stack
        direction={'row'}
        // sx={{ height: 300 }}
        spacing={5}
        sx={{ height }}
        display={'flex'}
        alignItems={'center'}
        alignContent={'center'}
      >
        <Slider
          value={value}
          onChange={handleSliderChange}
          // aria-labelledby="input-slider"
          orientation={'vertical'}
        />

        {children}
      </Stack>
    </Stack>
  )
}
