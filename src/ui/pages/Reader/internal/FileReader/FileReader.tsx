import { Language } from '@/domains'
import { QrConfirmButton } from '@/ui/fragments/button'
import { InputFile } from '@/ui/fragments/input/InputFile/InputFile'
import { Box, Stack } from '@mui/material'
import { FC, useState } from 'react'

interface Props {
  language: Language
}

export const FileReader: FC<Props> = ({ language }) => {
  const [file, setFile] = useState<File | null>(null)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        width: '100%'
      }}
    >
      <Stack spacing={3} alignItems="center">
        <InputFile file={file} onChange={setFile} />
        <QrConfirmButton file={file} language={language} />
      </Stack>
    </Box>
  )
}
