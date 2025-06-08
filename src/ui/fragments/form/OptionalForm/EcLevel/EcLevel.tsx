import React, { FC } from 'react'
import { ImageForm } from '@/ui/fragments/form/OptionalForm/ImageForm/ImageForm'
import { useQrCode } from '@/hooks'
import { EcLevelSelect } from '@/ui/fragments/select'

type Props = {}

export const EcLevel: FC<Props> = ({}) => {
  const { ecLevel, setEcLevel } = useQrCode()
  return <EcLevelSelect value={ecLevel} onChange={setEcLevel} />
}
