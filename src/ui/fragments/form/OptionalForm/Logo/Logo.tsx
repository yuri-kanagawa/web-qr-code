import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks'
import { ImageForm } from '@/ui/fragments/form/OptionalForm/ImageForm/ImageForm'
import { Box, FormLabel } from '@mui/material'
import { FC } from 'react'

type Props = {
  file: File | null
  setFile: (value: File | null) => void
  language: Language
}

export const Logo: FC<Props> = ({ file, setFile, language }) => {
  const { settings, updateLogoWidth, updateLogoHeight } = useQrCode()
  const locale = language.locale

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        borderRadius: 1,
        position: 'relative',
        px: 2,
        pt: 3,
        pb: 4,
        '&:hover': {
          borderColor: 'rgba(0, 0, 0, 0.87)'
        }
      }}
    >
      <FormLabel
        sx={{
          position: 'absolute',
          top: -10,
          left: 10,
          px: 0.5,
          bgcolor: 'background.paper',
          fontSize: '0.75rem'
        }}
      >
        {locale.word.qrSettings.logo}
      </FormLabel>
      <ImageForm
        file={file}
        setFile={setFile}
        logHeight={settings.logo.height}
        logWidth={settings.logo.width}
        setLogoHeight={updateLogoHeight}
        setLogoWidth={updateLogoWidth}
        max={settings.size.value}
        language={language}
      />
    </Box>
  )
}
