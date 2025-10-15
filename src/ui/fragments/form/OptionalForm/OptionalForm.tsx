import { Language } from '@/domains/valueObjects/language'
import { Stack } from '@/ui/cores'
import { EcLevel } from '@/ui/fragments/form/OptionalForm/EcLevel'
import { EyeColor1 } from '@/ui/fragments/form/OptionalForm/EyeColor1'
import { EyeColor2 } from '@/ui/fragments/form/OptionalForm/EyeColor2'
import { EyeColor3 } from '@/ui/fragments/form/OptionalForm/EyeColor3'
import { FgColor } from '@/ui/fragments/form/OptionalForm/FgColor/FgColor'
import { Logo } from '@/ui/fragments/form/OptionalForm/Logo'
import { LogoPadding } from '@/ui/fragments/form/OptionalForm/LogoPadding'
import { Opacity } from '@/ui/fragments/form/OptionalForm/Opacity'
import { FC } from 'react'
import { BgColor } from './BgColor'
import { Size } from './Size'

type Props = {
  file: File | null
  setFile: (value: File | null) => void
  language: Language
}
export const OptionalForm: FC<Props> = ({ file, setFile, language }) => {
  return (
    <Stack spacing={4}>
      <Size language={language} />
      <BgColor language={language} />
      <FgColor language={language} />
      <EcLevel language={language} />
      <EyeColor1 language={language} />
      <EyeColor2 language={language} />
      <EyeColor3 language={language} />
      {/*<QRFinderPattern size={100} borderRadius={80} />*/}
      <Logo file={file} setFile={setFile} language={language} />
      <Opacity file={file} language={language} />
      <LogoPadding language={language} file={file} />
    </Stack>
  )
}
