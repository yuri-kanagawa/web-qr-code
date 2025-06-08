import React, { FC } from 'react'
import { Step01Slider } from '@/ui/fragments/slider'
import { useQrCode } from '@/hooks'

type Props = {
  file: File | null
}

export const Opacity: FC<Props> = ({ file }) => {
  const isRelationFileDisabled = file == null
  const { logoOpacity, setLogoOpacity } = useQrCode()
  return (
    <>
      {/*<TextField*/}
      {/*  label={'Logo Opacity'}*/}
      {/*  disabled={isRelationFileDisabled}*/}
      {/*  value={logoOpacity}*/}
      {/*  onChange={(event) => setLogoOpacity(Number(event.target.value))}*/}
      {/*/>*/}
      <Step01Slider
        min={0}
        max={1}
        disabled={isRelationFileDisabled}
        value={logoOpacity}
        onChange={setLogoOpacity}
        marks={[
          { value: 0, label: 0 },
          { value: 1, label: 1 }
        ]}
        valueLabelDisplay={'auto'}
      />
    </>
  )
}
