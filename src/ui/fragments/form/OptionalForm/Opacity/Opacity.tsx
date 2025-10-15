import React, { FC } from 'react'
import { Step01Slider } from '@/ui/fragments/slider'
import { useQrCode } from '@/hooks'

type Props = {
  file: File | null
}

export const Opacity: FC<Props> = ({ file }) => {
  const isRelationFileDisabled = file == null
  const { settings, updateLogoOpacity } = useQrCode()
  return (
    <>
      <Step01Slider
        min={0}
        max={1}
        disabled={isRelationFileDisabled}
        value={settings.logo.opacity ?? 1}
        onChange={updateLogoOpacity}
        marks={[
          { value: 0, label: 0 },
          { value: 1, label: 1 }
        ]}
        valueLabelDisplay={'auto'}
      />
    </>
  )
}
