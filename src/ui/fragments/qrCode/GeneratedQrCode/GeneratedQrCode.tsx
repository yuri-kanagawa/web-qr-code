'use client'

import React, { useEffect, useMemo, useState } from 'react'

import { useQrCode, useWindowSize } from '@/hooks'

import { CornerHighlightBox } from '@/ui/fragments/box'
import { QRCode, Stack } from '@/ui/cores'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { IconButton } from '@mui/material'

type Props = {
  file: File | null
  value: string
  isValid?: boolean
  showHiddenIcon?: boolean
}

const GeneratedQrCode = React.forwardRef<HTMLDivElement, Props>(
  ({ value, file, isValid, showHiddenIcon = false }, ref) => {
    const {
      ecLevel,
      enableCORS,
      size,
      bgColor,
      fgColor,
      logoWidth,
      logoHeight,
      logoOpacity,
      logoPaddingStyle,
      eyeColor1,
      eyeColor2,
      eyeColor3,
      eyeRadius1,
      eyeRadius2,
      eyeRadius3
    } = useQrCode()
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
                {isValid && value && (
                  <>
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
                      enableCORS={enableCORS}
                    />
                    {showHiddenIcon && (
                      <IconButton
                        onClick={() => setHidden(!hidden)}
                        sx={{
                          position: 'absolute',
                          top: -12,
                          right: -12,
                          backgroundColor: 'white',
                          '&:hover': {
                            backgroundColor: 'white'
                          }
                        }}
                      >
                        <IoEyeOffOutline size={24} />
                      </IconButton>
                    )}
                  </>
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
