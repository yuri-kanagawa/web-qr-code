import { LeftTopQrFinderPattern } from '@/ui/fragments/qrCode'
import React, { FC } from 'react'
import { useQrCode } from '@/hooks'
type Props = {}
export const EyeColor1: FC<Props> = () => {
  const { settings, updateEyeColor1 } = useQrCode()
  return (
    <LeftTopQrFinderPattern
      eyeColor1={settings.colors.eyeColor1.value}
      setEyeColor1={updateEyeColor1}
    />
  )
}
