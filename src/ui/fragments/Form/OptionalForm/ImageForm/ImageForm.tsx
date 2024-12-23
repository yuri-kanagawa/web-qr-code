import { UploadFile } from '@/ui/cores/uploadFile/UploadFile'
import { convertBase64ToFile, convertImageToBase64 } from '@/utils/file'
import React, { FC } from 'react'
import { useQrcode } from '@/hooks'
type Props = {}
export const ImageForm: FC<Props> = ({}) => {
  const {
    bgColor,
    size,
    setSize,
    setBgColor,
    fgColor,
    setFgColor,
    ecLevel,
    setEcLevel,
    logoImage,
    setLogoImage,
    logoOpacity,
    setLogoOpacity
  } = useQrcode()
  return (
    <>
      <UploadFile
        file={!!logoImage ? convertBase64ToFile(logoImage, 'qr') : null}
        onChange={async (value) => {
          if (value) {
            const base64 = await convertImageToBase64(value)
            setLogoImage(base64)
          }
        }}
        width={100}
        height={100}
      />
    </>
  )
}
