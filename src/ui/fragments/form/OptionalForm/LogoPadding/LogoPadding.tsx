import React, { FC } from 'react'
import { LogoPaddingStyleSelect } from '@/ui/fragments/select'
import { useQrCode } from '@/hooks'

type Props = {}

export const LogoPadding: FC<Props> = ({}) => {
  const { logoPaddingStyle, setLogoPaddingStyle } = useQrCode()
  return (
    <LogoPaddingStyleSelect
      value={logoPaddingStyle}
      onChange={setLogoPaddingStyle}
    />
  )
}
