import {
  LeftTopQrFinderPattern,
  RightTopQrFinderPattern
} from '@/ui/fragments/qrCode'
import React, { FC } from 'react'
import { useQrCode } from '@/hooks'
type Props = {}
export const EyeColor2: FC<Props> = () => {
  const { settings, updateEyeColor2 } = useQrCode()
  return (
    <RightTopQrFinderPattern
      eyeColor2={settings.colors.eyeColor2.value}
      setEyeColor2={updateEyeColor2}
    />
  )
}
