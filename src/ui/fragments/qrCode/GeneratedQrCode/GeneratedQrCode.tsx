'use client'

import React, { useEffect, useMemo, useState } from 'react'

import { QrCode } from '@/domains'
import { useWindowSize } from '@/hooks'

import { QRCode, Stack } from '@/ui/cores'
import { CornerHighlightBox } from '@/ui/fragments/box'
import { IconButton } from '@mui/material'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'

type Props = {
  file: File | null
  isValid?: boolean
  showHiddenIcon?: boolean
  height?: number
  width?: number
  qr: QrCode
}

const GeneratedQrCode = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      file,
      isValid,
      showHiddenIcon = false,
      height: propHeight,
      width: propWidth,
      qr
    },
    ref
  ) => {
    const { height, width } = useWindowSize()

    // qrがundefinedの場合のフォールバック
    const safeQr = qr || QrCode.default()

    const maxSize = useMemo(() => {
      // 親から指定されたサイズがある場合はそれを使用
      if (propHeight && propWidth) {
        return Math.min(propHeight, propWidth) - 50
      }
      // 従来の計算ロジック
      if (height < width) {
        return height - 150
      }
      return width - 500
    }, [height, width, propHeight, propWidth])

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
    const [hidden, setHidden] = useState(false)
    useEffect(() => {
      if (!showHiddenIcon) {
        setHidden(false)
      }
    }, [showHiddenIcon])
    return (
      <>
        {!hidden && (
          <Stack p={4}>
            <CornerHighlightBox height={maxSize + 50} width={maxSize + 50}>
              <div ref={ref} style={{ position: 'relative' }}>
                {isValid && qr.qrValue.value && (
                  console.log('GeneratedQrCode rendering QR:', qr.qrValue.value) || true) && (
                  <>
                    <QRCode
                      value={qr.qrValue.value}
                      size={safeQr.size.value}
                      bgColor={safeQr.colors.bgColor.value}
                      fgColor={safeQr.colors.fgColor.value}
                      ecLevel={safeQr.ecLevel.value as 'L' | 'M' | 'Q' | 'H'}
                      logoImage={logoImage}
                      logoWidth={safeQr.logo.width}
                      logoHeight={safeQr.logo.height}
                      logoOpacity={safeQr.logo.opacity}
                      eyeRadius={[
                        safeQr.eye.radius1,
                        safeQr.eye.radius2,
                        safeQr.eye.radius3
                      ]}
                      eyeColor={[
                        safeQr.colors.eyeColor1.value,
                        safeQr.colors.eyeColor2.value,
                        safeQr.colors.eyeColor3.value
                      ]}
                      logoPaddingStyle={safeQr.logo.paddingStyle}
                      logoPadding={9}
                      enableCORS={safeQr.enableCORS || false}
                    />
                  </>
                )}
                {showHiddenIcon && (
                  <IconButton
                    onClick={() => setHidden(!hidden)}
                    sx={{
                      zIndex: 2,
                      position: 'absolute',
                      top: isValid && qr.qrValue.value ? -12 : -60,
                      right: isValid && qr.qrValue.value ? -12 : -60
                      // backgroundColor: 'white',
                      // '&:hover': {
                      //   backgroundColor: 'white'
                      // }
                    }}
                  >
                    <IoEyeOffOutline size={24} />
                  </IconButton>
                )}
              </div>
            </CornerHighlightBox>
          </Stack>
        )}
        {hidden && (
          <IconButton onClick={() => setHidden(!hidden)}>
            <IoEyeOutline size={24} />
          </IconButton>
        )}
      </>
    )
  }
)

GeneratedQrCode.displayName = 'GeneratedQrCode'

export default GeneratedQrCode
