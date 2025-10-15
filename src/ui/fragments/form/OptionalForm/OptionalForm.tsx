import { useQrCode, useWindowSize } from '@/hooks'

import React, { FC, useMemo } from 'react'
import { Stack } from '@/ui/cores'
import { maxWidth } from '@mui/system'
import { Language } from '@/domains/valueObjects/language'
import { BgColor } from './BgColor'
import { FgColor } from '@/ui/fragments/form/OptionalForm/FgColor/FgColor'
import { EcLevel } from '@/ui/fragments/form/OptionalForm/EcLevel'
import { Logo } from '@/ui/fragments/form/OptionalForm/Logo'
import { Opacity } from '@/ui/fragments/form/OptionalForm/Opacity'
import { LogoPadding } from '@/ui/fragments/form/OptionalForm/LogoPadding'
import { EyeColor1 } from '@/ui/fragments/form/OptionalForm/EyeColor1'
import { EyeColor2 } from '@/ui/fragments/form/OptionalForm/EyeColor2'
import { EyeColor3 } from '@/ui/fragments/form/OptionalForm/EyeColor3'
import { Size } from './Size'

type Props = {
  file: File | null
  setFile: (value: File | null) => void
  language?: Language
}
export const OptionalForm: FC<Props> = ({
  file,
  setFile,
  language = Language.default()
}) => {
  return (
    <Stack spacing={4}>
      <Size />
      <BgColor />
      <FgColor />
      <EcLevel />
      <Logo file={file} setFile={setFile} language={language} />
      <Opacity file={file} />
      <LogoPadding />
      {/*<QRFinderPattern size={100} borderRadius={80} />*/}
      <EyeColor1 />
      <EyeColor2 />
      <EyeColor3 />
    </Stack>
  )
}
