import { Box, Grid, Slider, StackProps } from '@/ui/cores'
import { FC, useState } from 'react'

type Props = {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
  max?: number
} & Omit<StackProps, 'height' | 'width' | 'onChange'>

export const WidthSlider: FC<Props> = ({
  value,
  onChange,
  max,
  disabled,
  ...rest
}) => {
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
            disabled={disabled}
            value={value}
            max={max}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
            min={1}
            marks={[
              { value: 1, label: 1 },
              ...(max ? [{ value: max, label: max }] : [])
            ]}
          />
        </Grid>
        <Grid item>
          {/*<Input*/}
          {/*  value={value}*/}
          {/*  size="small"*/}
          {/*  disabled={disabled}*/}
          {/*  onChange={handleInputChange}*/}
          {/*  onBlur={handleBlur}*/}
          {/*  inputProps={{*/}
          {/*    step: 1,*/}
          {/*    min: 0,*/}
          {/*    max: max,*/}
          {/*    type: 'number',*/}
          {/*    'aria-labelledby': 'input-slider'*/}
          {/*  }}*/}
          {/*/>*/}
        </Grid>
      </Grid>
    </Box>
  )
}
