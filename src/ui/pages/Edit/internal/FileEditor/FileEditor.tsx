import { Language } from '@/domains'
import { QrEditButton } from '@/ui/fragments/button/QrEditButton/QrEditButton'
import { FormCard } from '@/ui/fragments/form'
import { InputFile } from '@/ui/fragments/input/InputFile/InputFile'
import { Box, Stack } from '@mui/material'
import { FC, useState } from 'react'

interface Props {
  language: Language
}

export const FileEditor: FC<Props> = ({ language }) => {
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
      <Box sx={{ maxWidth: 600, width: '100%', px: 2 }}>
        <FormCard cardProps={{ sx: { p: 3 } }}>
          <Stack spacing={3} alignItems="center">
            <InputFile
              file={file}
              onChange={setFile}
              language={language}
              width="100%"
              height={300}
              sx={{ maxWidth: 400 }}
            />
            <QrEditButton file={file} language={language} />
          </Stack>
        </FormCard>
      </Box>
    </Box>
  )
}
