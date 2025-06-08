import React, { FC } from 'react'
import { MuiColorInput } from 'mui-color-input'
import { useQrCode, useWindowSize } from '@/hooks'

type Props = {}

export const FgColor: FC<Props> = () => {
  const { fgColor, setFgColor } = useQrCode()
  const { height, width } = useWindowSize()
  return (
    <MuiColorInput
      format="hex"
      value={fgColor}
      label={'Space Color'}
      onChange={setFgColor}
      isAlphaHidden={true}
    />
  )
}
