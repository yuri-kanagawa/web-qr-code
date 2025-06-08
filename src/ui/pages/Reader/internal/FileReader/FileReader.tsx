import { InputFile } from '@/ui/fragments/input/InputFile/InputFile'
import React, { useRef, useState } from 'react'
import { useQrCode } from '@/hooks'

import { QrFileCheckButton } from '@/ui/cores/button/QrFileCheckButton'
import { QrInformationDialog } from '@/ui/fragments/button/QrConfirmButton/internal/QrInformationDialog'
import { Stack } from '@mui/material'

export const FileReader = () => {
  const [qrInformation, setQrInformation] = useState('')
  const [file, setFile] = useState<File | null>(null)
  return (
    <Stack>
      <InputFile file={file} onChange={setFile} />
      <QrFileCheckButton file={file} setQrInformation={setQrInformation} />
      <QrInformationDialog
        qrInformation={qrInformation}
        setQrInformation={setQrInformation}
      />
    </Stack>
  )
}
