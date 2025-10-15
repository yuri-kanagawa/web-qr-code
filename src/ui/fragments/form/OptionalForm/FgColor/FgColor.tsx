import React, { FC } from 'react'
import { MuiColorInput } from 'mui-color-input'
import { useQrCode } from '@/hooks'

type Props = {}

export const FgColor: FC<Props> = () => {
  const { settings, updateFgColor } = useQrCode()

  return (
    <MuiColorInput
      format="hex"
      value={settings.colors.fgColor.value}
      label={'Space Color'}
      onChange={updateFgColor}
      isAlphaHidden={true}
    />
  )
}
