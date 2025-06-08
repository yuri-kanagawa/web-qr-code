import {
  LeftBottomQrFinderPattern,
  LeftTopQrFinderPattern
} from '@/ui/fragments/qrCode'
import React, { FC } from 'react'
import { useQrCode } from '@/hooks'
type Props = {}
export const EyeColor3: FC<Props> = () => {
  const { eyeColor3, setEyeColor3 } = useQrCode()
  return (
    <LeftBottomQrFinderPattern
      eyeColor3={eyeColor3}
      setEyeColor3={setEyeColor3}
    />
  )
}
