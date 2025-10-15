import {
  LeftBottomQrFinderPattern,
  LeftTopQrFinderPattern
} from '@/ui/fragments/qrCode'
import React, { FC } from 'react'
import { useQrCode } from '@/hooks'
type Props = {}
export const EyeColor3: FC<Props> = () => {
  const { settings, updateEyeColor3 } = useQrCode()
  return (
    <LeftBottomQrFinderPattern
      eyeColor3={settings.colors.eyeColor3.value}
      setEyeColor3={updateEyeColor3}
    />
  )
}
