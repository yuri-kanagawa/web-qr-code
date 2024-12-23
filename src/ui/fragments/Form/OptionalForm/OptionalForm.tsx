import { useQrcode, useWindowSize } from '@/hooks'
import { MuiColorInput } from 'mui-color-input'
import { EcLevelSelect } from '@/ui/cores/select/EcLevelSelect/EcLevelSelect'
import { UploadFile } from '@/ui/cores/uploadFile/UploadFile'
import { convertBase64ToFile, convertImageToBase64 } from '@/utils/file'
import { Box, Input, Slider, TextField } from '@mui/material'
import React, { useMemo } from 'react'
import { Step01Slider } from '@/ui/cores/slider'
import { ImageForm } from '@/ui/fragments/Form/OptionalForm/ImageForm/ImageForm'
import { LogoPaddingStyleSelect } from '@/ui/cores/select'

export const OptionalForm = () => {
  const {
    bgColor,
    size,
    setSize,
    setBgColor,
    fgColor,
    setFgColor,
    ecLevel,
    setEcLevel,
    logoImage,
    setLogoImage,
    logoOpacity,
    setLogoOpacity,
    logoPaddingStyle,
    setLogoPaddingStyle
  } = useQrcode()
  const { height, width } = useWindowSize()
  const maxSize = useMemo(() => {
    if (height < width) {
      return height - 150
    }
    return width - 500
  }, [height, width])

  return (
    <>
      <TextField
        value={size}
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
        value={logoOpacity}
        onChange={(event) => setLogoOpacity(Number(event.target.value))}
      />
      <ImageForm />
      <Step01Slider min={0} max={1} value={1} onChange={setLogoOpacity} />
      <LogoPaddingStyleSelect
        value={logoPaddingStyle}
        onChange={setLogoPaddingStyle}
      />
    </>
  )
}
