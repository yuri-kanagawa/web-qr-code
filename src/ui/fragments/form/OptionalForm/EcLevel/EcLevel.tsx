import React, { FC } from 'react'
import { ImageForm } from '@/ui/fragments/form/OptionalForm/ImageForm/ImageForm'
import { useQrcode } from '@/hooks'
import { EcLevelSelect } from '@/ui/cores/select'

type Props = {}

export const EcLevel: FC<Props> = ({}) => {
  const { ecLevel, setEcLevel } = useQrcode()
  return <EcLevelSelect value={ecLevel} onChange={setEcLevel} />
}
