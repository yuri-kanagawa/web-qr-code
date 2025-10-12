import { InputFile } from '@/ui/fragments/input/InputFile/InputFile'
import React, { FC, useState } from 'react'
import { Stack } from '@mui/material'
import { QrConfirmButton } from '@/ui/fragments/button'
import { Language } from '@/domains'

interface Props {
  language: Language
}

export const FileReader: FC<Props> = (props) => {
  const [file, setFile] = useState<File | null>(null)
  return (
    <Stack>
      <InputFile file={file} onChange={setFile} />
      <QrConfirmButton file={file} />
    </Stack>
  )
}
