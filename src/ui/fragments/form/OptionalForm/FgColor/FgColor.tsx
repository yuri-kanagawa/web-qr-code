import React, { FC } from 'react'
import { MuiColorInput } from 'mui-color-input'
import { useQrcode, useWindowSize } from '@/hooks'

type Props = {}

export const FgColor: FC<Props> = () => {
  const { fgColor, setFgColor } = useQrcode()
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
