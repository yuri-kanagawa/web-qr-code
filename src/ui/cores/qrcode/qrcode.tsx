'use client'

import { QRCode } from 'react-qrcode-logo'
import React, {
  FC,
  ForwardedRef,
  MutableRefObject,
  RefObject,
  useMemo,
  useRef
} from 'react'
import { IProps } from 'react-qrcode-logo/lib'
import { useQrcode, useWindowSize } from '@/hooks'
import { Box, Input, Slider, Stack } from '@mui/material'
import { CornerHighlightBox } from '@/ui/cores/box'
export type EcLevelType = 'L' | 'M' | 'Q' | 'H'
const GeneratedQrcode = React.forwardRef<HTMLDivElement, IProps>(
  ({ value }, ref) => {
    const {
      ecLevel,
      enableCORS,
      size,
      quietZone,
      bgColor,
      fgColor,
      logoWidth,
      logoHeight,
      logoOpacity,
      removeQrCodeBehindLogo,
      logoPadding,
      logoPaddingStyle,
      QrStyle,
      setSize
    } = useQrcode()

    const { height, width } = useWindowSize()
    const maxSize = useMemo(() => {
      if (height < width) {
        return height - 150
      }
      return width - 500
    }, [height, width])
    return (
      <Stack p={4}>
        {/*<Box*/}
        {/*  height={maxSize}*/}
        {/*  sx={{*/}
        {/*    position: 'relative', // 疑似要素や絶対位置のために必要*/}
        {/*    width: '200px', // ボックスの幅*/}
        {/*    height: '200px', // ボックスの高さ*/}
        {/*    border: '1px solid #ccc' // メインの枠線*/}
        {/*  }}*/}
        {/*>*/}

        {/*</Box>*/}
        <CornerHighlightBox height={maxSize + 50} width={maxSize + 50}>
          <div ref={ref}>
            <QRCode
              value={value}
              size={size}
              // ecLevel={ecLevel}
              // enableCORS={enableCORS}
              // size={500}
            />
          </div>
        </CornerHighlightBox>

        <Input />
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
      </Stack>
    )
  }
)

GeneratedQrcode.displayName = 'GeneratedQrcode'

export default GeneratedQrcode
