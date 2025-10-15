import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks'
import { ImageForm } from '@/ui/fragments/form/OptionalForm/ImageForm/ImageForm'
import { Stack, Typography } from '@mui/material'
import { FC } from 'react'

type Props = {
  file: File | null
  setFile: (value: File | null) => void
  language: Language
}

export const Logo: FC<Props> = ({ file, setFile, language }) => {
  const { settings, updateLogoWidth, updateLogoHeight } = useQrCode()
  const locale = language.getLocale()

  return (
    <Stack spacing={1}>
      <Typography variant="body2" color="text.secondary">
        {locale.word.qrSettings.logo}
      </Typography>
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
    </Stack>
  )
}
