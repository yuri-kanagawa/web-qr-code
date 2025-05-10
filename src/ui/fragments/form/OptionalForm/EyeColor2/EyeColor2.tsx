import {
  LeftTopQrFinderPattern,
  RightTopQrFinderPattern
} from '@/ui/cores/qrcode'
import React, { FC } from 'react'
import { useQrcode } from '@/hooks'
type Props = {}
export const EyeColor2: FC<Props> = () => {
  const { eyeColor2, setEyeColor2 } = useQrcode()
  return (
    <RightTopQrFinderPattern
      eyeColor2={eyeColor2}
      setEyeColor2={setEyeColor2}
    />
  )
}
