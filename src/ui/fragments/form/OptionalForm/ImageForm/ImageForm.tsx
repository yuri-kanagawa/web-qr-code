import { UploadFile } from '@/ui/cores/uploadFile/UploadFile'
import { convertBase64ToFile, convertImageToBase64 } from '@/utils/file'
import React, { FC } from 'react'
import { useQrcode } from '@/hooks'
type Props = {
  file: File | null
  setFile: (value: File | null) => void
}
export const ImageForm: FC<Props> = ({ file, setFile }) => {
  return (
    <>
      <UploadFile
        file={file}
        onChange={async (value) => {
          setFile(value)
        }}
        width={100}
        height={100}
      />
    </>
  )
}
