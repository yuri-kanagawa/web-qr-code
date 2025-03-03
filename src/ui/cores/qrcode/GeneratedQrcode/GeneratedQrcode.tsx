'use client'

import { QRCode } from 'react-qrcode-logo'
import React, {
  FC,
  ForwardedRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { IProps } from 'react-qrcode-logo/lib'
import { useQrcode, useWindowSize } from '@/hooks'
import { Box, Input, Slider, Stack } from '@mui/material'
import { CornerHighlightBox } from '@/ui/cores/box'
import { convertImageToBase64 } from '@/utils/file'
export type EcLevelType = 'L' | 'M' | 'Q' | 'H'

type Props = {
  file: File | null
  value: string
}

const GeneratedQrcode = React.forwardRef<HTMLDivElement, Props>(
  ({ value, file }, ref) => {
    const {
      ecLevel,
      enableCORS,
      size,
      // quietZone,
      bgColor,
      fgColor,
      logoWidth,
      logoHeight,
      logoOpacity,
      removeQrCodeBehindLogo,
      logoPadding,
      logoPaddingStyle,
      QrStyle,
      setSize,
      eyeColor1,
      eyeColor2,
      eyeColor3,
      eyeRadius1,
      eyeRadius2,
      eyeRadius3
    } = useQrcode()
    const { height, width } = useWindowSize()
    const maxSize = useMemo(() => {
      if (height < width) {
        return height - 150
      }
      return width - 500
    }, [height, width])

    const [logoImage, setLogoImage] = useState<string | undefined>(undefined)

    useEffect(() => {
      const convertImageToBase64 = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      }

      if (file) {
        ;(async () => {
          const base64 = await convertImageToBase64(file)
          setLogoImage(base64)
        })()
      } else {
        setLogoImage(undefined)
      }
    }, [file])

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
            {value !== '' && (
              <QRCode
                value={value}
                size={size}
                bgColor={bgColor}
                fgColor={fgColor}
                ecLevel={ecLevel}
                logoImage={logoImage}
                logoWidth={logoWidth}
                logoHeight={logoHeight}
                logoOpacity={logoOpacity}
                eyeRadius={[eyeRadius1, eyeRadius2, eyeRadius3]}
                eyeColor={[eyeColor1, eyeColor2, eyeColor3]}
                logoPaddingStyle={logoPaddingStyle}
                logoPadding={9}
              />
            )}
          </div>
        </CornerHighlightBox>
      </Stack>
    )
  }
)

GeneratedQrcode.displayName = 'GeneratedQrcode'

export default GeneratedQrcode
