import React, { FC } from 'react'
import { ImageForm } from '@/ui/fragments/form/OptionalForm/ImageForm/ImageForm'
import { useQrCode } from '@/hooks'

type Props = {
  file: File | null
  setFile: (value: File | null) => void
}

export const Logo: FC<Props> = ({ file, setFile }) => {
  const { settings, updateLogoWidth, updateLogoHeight } = useQrCode()
  return (
    <ImageForm
      file={file}
      setFile={setFile}
      logHeight={settings.logo.height}
      logWidth={settings.logo.width}
      setLogoHeight={updateLogoHeight}
      setLogoWidth={updateLogoWidth}
      max={settings.size.value}
    />
  )
}
