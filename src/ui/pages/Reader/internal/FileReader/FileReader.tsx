import { InputFile } from '@/ui/fragments/input/InputFile/InputFile'
import React, { useState } from 'react'
import { Stack } from '@mui/material'
import { QrConfirmButton } from '@/ui/fragments/button'

export const FileReader = () => {
  const [file, setFile] = useState<File | null>(null)
  return (
    <Stack>
      <InputFile file={file} onChange={setFile} />
      <QrConfirmButton file={file} />
    </Stack>
  )
}
