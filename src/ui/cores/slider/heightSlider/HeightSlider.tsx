import React, { FC, useState } from 'react'
import {
  Box,
  Grid,
  Input,
  Slider,
  Stack,
  StackProps,
  Typography
} from '@mui/material'
import { VolumeUp } from '@mui/icons-material'

type Props = {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
  max?: number
} & Omit<StackProps, 'height' | 'width' | 'onChange'>

export const HeightSlider: FC<Props> = ({
  children,
  value,
  onChange,
  disabled,
  max,
  ...rest
}) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value === '' ? 0 : Number(event.target.value))
  }

  // const handleBlur = () => {
  //   if (value < 0) {
  //     onChange(0)
  //   } else if (value > 100) {
  //     onChange(100)
  //   }
  // }

  return (
    <Stack {...rest} spacing={2}>
      {/*<Box px={1}>*/}
      {/*  <Input*/}
      {/*    sx={{ width: 50 }}*/}
      {/*    value={value ?? 0}*/}
      {/*    size="small"*/}
      {/*    onChange={handleInputChange}*/}
      {/*    // onBlur={handleBlur}*/}
      {/*    disabled={disabled}*/}
      {/*    inputProps={{*/}
      {/*      step: 1,*/}
      {/*      min: 0,*/}
      {/*      max: max,*/}
      {/*      type: 'number'*/}
      {/*      // 'aria-labelledby': 'input-slider'*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</Box>*/}
      <Stack
        direction={'row'}
        // sx={{ height: 300 }}
        spacing={5}
        sx={rest.sx}
        display={'flex'}
        alignItems={'center'}
        alignContent={'center'}
      >
        <Slider
          value={value}
          onChange={handleSliderChange}
          disabled={disabled}
          orientation={'vertical'}
          max={max}
          min={1}
          marks={[
            { value: 1, label: 1 },
            { value: max, label: max }
          ]}
          valueLabelDisplay="auto"
        />

        {children}
      </Stack>
    </Stack>
  )
}
