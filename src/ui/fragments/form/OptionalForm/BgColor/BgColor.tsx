import React, { FC } from 'react'
import { MuiColorInput } from 'mui-color-input'
import { useQrcode } from '@/hooks'

type Props = {}

export const BgColor: FC<Props> = ({}) => {
  const {
    bgColor,

    setBgColor
  } = useQrcode()
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
