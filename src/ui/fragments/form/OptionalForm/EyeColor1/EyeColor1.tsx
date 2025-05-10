import { LeftTopQrFinderPattern } from '@/ui/cores/qrcode'
import React, { FC } from 'react'
import { useQrcode } from '@/hooks'
type Props = {}
export const EyeColor1: FC<Props> = () => {
  const { eyeColor1, setEyeColor1 } = useQrcode()
  return (
    <LeftTopQrFinderPattern eyeColor1={eyeColor1} setEyeColor1={setEyeColor1} />
  )
}
