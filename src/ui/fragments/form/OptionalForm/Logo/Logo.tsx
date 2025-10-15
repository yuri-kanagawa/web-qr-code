import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks'
import { ImageForm } from '@/ui/fragments/form/OptionalForm/ImageForm/ImageForm'
import { FC } from 'react'

type Props = {
  file: File | null
  setFile: (value: File | null) => void
  language: Language
}

export const Logo: FC<Props> = ({ file, setFile, language }) => {
  const { settings, updateLogoWidth, updateLogoHeight } = useQrCode()
  return (
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
  )
}
