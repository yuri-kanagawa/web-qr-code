import { LeftTopQrFinderPattern } from '@/ui/fragments/qrCode'
import React, { FC } from 'react'
import { useQrCode } from '@/hooks'
type Props = {}
export const EyeColor1: FC<Props> = () => {
  const { eyeColor1, setEyeColor1 } = useQrCode()
  return (
    <LeftTopQrFinderPattern eyeColor1={eyeColor1} setEyeColor1={setEyeColor1} />
  )
}
