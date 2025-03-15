import { UploadFile } from '@/ui/cores/uploadFile/UploadFile'
import React, { useRef, useState } from 'react'
import { useQrcode } from '@/hooks'

import { QrFileCheckButton } from '@/ui/cores/button/QrFileCheckButton'
import { QrInformationDialog } from '@/ui/cores/dialog/QrInformationDialog/QrInformationDialog'
import { Stack } from '@mui/material'

export const FileReader = () => {
  const [qrInformation, setQrInformation] = useState('')
  const { file, setFile } = useQrcode()
  return (
    <Stack>
      <UploadFile file={file} onChange={setFile} />
      <QrFileCheckButton file={file} setQrInformation={setQrInformation} />
      <QrInformationDialog
        qrInformation={qrInformation}
        setQrInformation={setQrInformation}
      />
    </Stack>
  )
}
