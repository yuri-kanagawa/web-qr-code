import React, { FC } from 'react'
import { LogoPaddingStyleSelect } from '@/ui/cores/select'
import { useQrcode } from '@/hooks'

type Props = {}

export const LogoPadding: FC<Props> = ({}) => {
  const { logoPaddingStyle, setLogoPaddingStyle } = useQrcode()
  return (
    <LogoPaddingStyleSelect
      value={logoPaddingStyle}
      onChange={setLogoPaddingStyle}
    />
  )
}
