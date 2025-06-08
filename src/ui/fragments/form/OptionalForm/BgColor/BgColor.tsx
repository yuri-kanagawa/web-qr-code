import React, { FC } from 'react'
import { MuiColorInput } from 'mui-color-input'
import { useQrCode } from '@/hooks'

type Props = {}

export const BgColor: FC<Props> = ({}) => {
  const {
    bgColor,

    setBgColor
  } = useQrCode()
  return (
    <MuiColorInput
      format="hex"
      value={bgColor}
      label={'Module Color'}
      onChange={setBgColor}
      isAlphaHidden={true}
    />
  )
}
