import React, { FC } from 'react'
import { LogoPaddingStyleSelect } from '@/ui/fragments/select'
import { useQrCode } from '@/hooks'

type Props = {}

export const LogoPadding: FC<Props> = ({}) => {
  const { settings, updateLogoPaddingStyle } = useQrCode()
  return (
    <LogoPaddingStyleSelect
      value={settings.logo.paddingStyle}
      onChange={updateLogoPaddingStyle}
    />
  )
}
