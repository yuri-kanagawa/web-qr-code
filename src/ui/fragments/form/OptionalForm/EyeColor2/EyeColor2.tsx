import {
  LeftTopQrFinderPattern,
  RightTopQrFinderPattern
} from '@/ui/fragments/qrCode'
import React, { FC } from 'react'
import { useQrCode } from '@/hooks'
type Props = {}
export const EyeColor2: FC<Props> = () => {
  const { eyeColor2, setEyeColor2 } = useQrCode()
  return (
    <RightTopQrFinderPattern
      eyeColor2={eyeColor2}
      setEyeColor2={setEyeColor2}
    />
  )
}
