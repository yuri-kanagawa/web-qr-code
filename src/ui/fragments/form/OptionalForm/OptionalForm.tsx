import { useQrcode, useWindowSize } from '@/hooks'
import { MuiColorInput } from 'mui-color-input'
import { EcLevelSelect } from '@/ui/cores/select/EcLevelSelect/EcLevelSelect'
import { UploadFile } from '@/ui/cores/uploadFile/UploadFile'
import { convertBase64ToFile, convertImageToBase64 } from '@/utils/file'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Input,
  Slider,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import React, { FC, useMemo } from 'react'
import { Step01Slider } from '@/ui/cores/slider'
import { ImageForm } from '@/ui/fragments/form/OptionalForm/ImageForm/ImageForm'
import { LogoPaddingStyleSelect } from '@/ui/cores/select'
import { Size } from './Size'
import {
  LeftBottomQrFinderPattern,
  LeftTopQrFinderPattern,
  RightTopQrFinderPattern
} from '@/ui/cores/qrcode'
import { maxWidth } from '@mui/system'
import { BgColor } from './BgColor'
import { FgColor } from '@/ui/fragments/form/OptionalForm/FgColor/FgColor'
import { EcLevel } from '@/ui/fragments/form/OptionalForm/EcLevel'
import { Logo } from '@/ui/fragments/form/OptionalForm/Logo'
import { Opacity } from '@/ui/fragments/form/OptionalForm/Opacity'
import { LogoPadding } from '@/ui/fragments/form/OptionalForm/LogoPadding'
import { EyeColor1 } from '@/ui/fragments/form/OptionalForm/EyeColor1'
import { EyeColor2 } from '@/ui/fragments/form/OptionalForm/EyeColor2'
import { EyeColor3 } from '@/ui/fragments/form/OptionalForm/EyeColor3'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
type Props = {
  file: File | null
  setFile: (value: File | null) => void
}
export const OptionalForm: FC<Props> = ({ file, setFile }) => {
  return (
    <>
      <Size />
      <BgColor />
      <FgColor />
      <EcLevel />
      <Logo file={file} setFile={setFile} />
      <Opacity file={file} />
      <LogoPadding />
      {/*<QRFinderPattern size={100} borderRadius={80} />*/}
      <EyeColor1 />
      <EyeColor2 />
      <EyeColor3 />
    </>
  )
}
