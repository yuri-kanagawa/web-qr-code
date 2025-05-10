import React, { FC } from 'react'
import { ImageForm } from '@/ui/fragments/form/OptionalForm/ImageForm/ImageForm'
import { useQrcode } from '@/hooks'

type Props = {
  file: File | null
  setFile: (value: File | null) => void
}

export const Logo: FC<Props> = ({ file, setFile }) => {
  const { size, logoHeight, setLogoWidth, logoWidth, setLogoHeight } =
    useQrcode()
  return (
    <ImageForm
      file={file}
      setFile={setFile}
      logHeight={logoHeight}
      logWidth={logoWidth}
      setLogoHeight={setLogoHeight}
      setLogoWidth={setLogoWidth}
      max={size}
    />
  )
}
