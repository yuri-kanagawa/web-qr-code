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
    const { settings } = useQrCode()
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
                      size={settings.size.value}
                      bgColor={settings.colors.bgColor.value}
                      fgColor={settings.colors.fgColor.value}
                      ecLevel={settings.ecLevel.value}
                      logoImage={logoImage}
                      logoWidth={settings.logo.width}
                      logoHeight={settings.logo.height}
                      logoOpacity={settings.logo.opacity}
                      eyeRadius={[
                        settings.eye.radius1,
                        settings.eye.radius2,
                        settings.eye.radius3
                      ]}
                      eyeColor={[
                        settings.colors.eyeColor1.value,
                        settings.colors.eyeColor2.value,
                        settings.colors.eyeColor3.value
                      ]}
                      logoPaddingStyle={settings.logo.paddingStyle}
                      logoPadding={9}
                      enableCORS={settings.enableCORS}
                    />
                  </>
                )}
                {showHiddenIcon && (
                  <IconButton
                    onClick={() => setHidden(!hidden)}
                    sx={{
                      zIndex: 2,
                      position: 'absolute',
                      top: isValid && value ? -12 : -60,
                      right: isValid && value ? -12 : -60
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
