import { Language } from '@/domains/valueObjects/language'
import { Stack } from '@/ui/cores'
import { FC } from 'react'
import { BgColor } from './BgColor'
import { EcLevel } from './EcLevel'
import { EyeSettings1 } from './EyeSettings1'
import { EyeSettings2 } from './EyeSettings2'
import { EyeSettings3 } from './EyeSettings3'
import { FgColor } from './FgColor/FgColor'
import { Logo } from './Logo'
import { LogoPadding } from './LogoPadding'
import { Opacity } from './Opacity'
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
      <EyeSettings1 language={language} />
      <EyeSettings2 language={language} />
      <EyeSettings3 language={language} />
      <Logo file={file} setFile={setFile} language={language} />
      <Opacity file={file} language={language} />
      <LogoPadding language={language} file={file} />
    </Stack>
  )
}
