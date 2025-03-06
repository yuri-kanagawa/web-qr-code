import { FC, useState } from 'react'
import { Box, Grid, Input, Slider, StackProps, Typography } from '@mui/material'
import { VolumeUp } from '@mui/icons-material'

type Props = {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
} & Omit<StackProps, 'height' | 'width' | 'onChange'>

export const WidthSlider: FC<Props> = ({ value, onChange, ...rest }) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value === '' ? 0 : Number(event.target.value))
  }

  const handleBlur = () => {
    if (value < 0) {
      onChange(0)
    } else if (value > 100) {
      onChange(100)
    }
  }

  return (
    <Box sx={{ width: 250 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            disabled
            value={value}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            disabled
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 200,
              type: 'number',
              'aria-labelledby': 'input-slider'
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
