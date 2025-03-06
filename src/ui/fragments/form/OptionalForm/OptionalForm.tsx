import { useQrcode, useWindowSize } from '@/hooks'
import { MuiColorInput } from 'mui-color-input'
import { EcLevelSelect } from '@/ui/cores/select/EcLevelSelect/EcLevelSelect'
import { UploadFile } from '@/ui/cores/uploadFile/UploadFile'
import { convertBase64ToFile, convertImageToBase64 } from '@/utils/file'
import { Box, Input, Slider, TextField } from '@mui/material'
import React, { FC, useMemo } from 'react'
import { Step01Slider } from '@/ui/cores/slider'
import { ImageForm } from '@/ui/fragments/form/OptionalForm/ImageForm/ImageForm'
import { LogoPaddingStyleSelect } from '@/ui/cores/select'
import {
  LeftBottomQrFinderPattern,
  LeftTopQrFinderPattern,
  RightTopQrFinderPattern
} from '@/ui/cores/qrcode'
type Props = {
  file: File | null
  setFile: (value: File | null) => void
}
export const OptionalForm: FC<Props> = ({ file, setFile }) => {
  const {
    bgColor,
    size,
    setSize,
    setBgColor,
    fgColor,
    setFgColor,
    ecLevel,
    setEcLevel,

    logoOpacity,
    setLogoOpacity,
    logoPaddingStyle,
    setLogoPaddingStyle,
    eyeColor1,
    setEyeColor1,
    eyeColor2,
    setEyeColor2,
    eyeColor3,
    setEyeColor3,
    logoHeight,
    setLogoWidth,
    logoWidth,
    setLogoHeight
  } = useQrcode()
  const { height, width } = useWindowSize()
  const maxSize = useMemo(() => {
    if (height < width) {
      return height - 150
    }
    return width - 500
  }, [height, width])

  const isRelationFileDisabled = file == null
  return (
    <>
      <TextField
        value={size}
        inputProps={{
          style: { textAlign: 'right' } // これを追加すると確実に右寄せされる
        }}
        onChange={(event) => {
          const value = Number(event.currentTarget.value)
          if (value > maxSize) return

          setSize(value)
        }}
      />
      <Slider
        value={size}
        min={5}
        step={1}
        max={maxSize}
        // scale={size}
        // getAriaValueText={valueLabelFormat}
        // valueLabelFormat={valueLabelFormat}
        onChange={(event, value) => setSize(Number(value))}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <MuiColorInput
        format="hex"
        value={bgColor}
        label={'Module Color'}
        onChange={setBgColor}
        isAlphaHidden={true}
      />
      <MuiColorInput
        format="hex"
        value={fgColor}
        label={'Space Color'}
        onChange={setFgColor}
        isAlphaHidden={true}
      />
      <EcLevelSelect value={ecLevel} onChange={setEcLevel} />

      <TextField
        label={'Logo Opacity'}
        disabled={isRelationFileDisabled}
        value={logoOpacity}
        onChange={(event) => setLogoOpacity(Number(event.target.value))}
      />
      <ImageForm
        file={file}
        setFile={setFile}
        logHeight={logoHeight}
        logWidth={logoWidth}
        setLogoHeight={setLogoHeight}
        setLogoWidth={setLogoWidth}
      />
      <Step01Slider
        min={0}
        max={1}
        disabled={isRelationFileDisabled}
        value={logoOpacity}
        onChange={setLogoOpacity}
      />
      <LogoPaddingStyleSelect
        value={logoPaddingStyle}
        onChange={setLogoPaddingStyle}
      />
      {/*<QRFinderPattern size={100} borderRadius={80} />*/}

      <LeftTopQrFinderPattern
        eyeColor1={eyeColor1}
        setEyeColor1={setEyeColor1}
      />
      <RightTopQrFinderPattern
        eyeColor2={eyeColor2}
        setEyeColor2={setEyeColor2}
      />
      <LeftBottomQrFinderPattern
        eyeColor3={eyeColor3}
        setEyeColor3={setEyeColor3}
      />
    </>
  )
}
