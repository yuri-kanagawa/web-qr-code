import React, { FC, useMemo } from 'react'
import { Slider, Stack, TextField } from '@mui/material'
import { useQrCode, useWindowSize } from '@/hooks'

type Props = {}

export const Size: FC<Props> = ({}) => {
  const { height, width } = useWindowSize()
  const { size, setSize } = useQrCode()
  const maxSize = useMemo(() => {
    if (height < width) {
      return height - 150
    }
    return width - 500
  }, [height, width])

  return (
    <>
      {/*<TextField*/}
      {/*  value={size}*/}
      {/*  inputProps={{*/}
      {/*    style: { textAlign: 'right' } // これを追加すると確実に右寄せされる*/}
      {/*  }}*/}
      {/*  onChange={(event) => {*/}
      {/*    const value = Number(event.currentTarget.value)*/}
      {/*    if (value > maxSize) return*/}

      {/*    setSize(value)*/}
      {/*  }}*/}
      {/*/>*/}
      <Stack>
        <Slider
          max={maxSize}
          value={size}
          min={1}
          onChange={(event, value) => setSize(Number(value))}
          // valueLabelFormat={String(size)}
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
