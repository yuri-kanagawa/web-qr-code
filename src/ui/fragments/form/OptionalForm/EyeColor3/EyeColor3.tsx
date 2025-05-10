import {
  LeftBottomQrFinderPattern,
  LeftTopQrFinderPattern
} from '@/ui/cores/qrcode'
import React, { FC } from 'react'
import { useQrcode } from '@/hooks'
type Props = {}
export const EyeColor3: FC<Props> = () => {
  const { eyeColor3, setEyeColor3 } = useQrcode()
  return (
    <LeftBottomQrFinderPattern
      eyeColor3={eyeColor3}
      setEyeColor3={setEyeColor3}
    />
  )
}
