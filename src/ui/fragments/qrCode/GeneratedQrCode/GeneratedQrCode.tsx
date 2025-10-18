'use client'

import React, { useEffect, useMemo, useState } from 'react'

import { QrCodeSettings } from '@/domains'
import { useWindowSize } from '@/hooks'

import { QRCode, Stack } from '@/ui/cores'
import { CornerHighlightBox } from '@/ui/fragments/box'
import { IconButton } from '@mui/material'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'

type Props = {
  file: File | null
  value: string
  isValid?: boolean
  showHiddenIcon?: boolean
  height?: number
  width?: number
  settings: QrCodeSettings
}

const GeneratedQrCode = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      value,
      file,
      isValid,
      showHiddenIcon = false,
      height: propHeight,
      width: propWidth,
      settings
    },
    ref
  ) => {
    const { height, width } = useWindowSize()

    // settingsがundefinedの場合のフォールバック
    const safeSettings = settings || QrCodeSettings.default()

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
                {isValid && value && (
                  <>
                    <QRCode
                      value={value}
                      size={safeSettings.size.value}
                      bgColor={safeSettings.colors.bgColor.value}
                      fgColor={safeSettings.colors.fgColor.value}
                      ecLevel={
                        safeSettings.ecLevel.value as 'L' | 'M' | 'Q' | 'H'
                      }
                      logoImage={logoImage}
                      logoWidth={safeSettings.logo.width}
                      logoHeight={safeSettings.logo.height}
                      logoOpacity={safeSettings.logo.opacity}
                      eyeRadius={[
                        safeSettings.eye.radius1,
                        safeSettings.eye.radius2,
                        safeSettings.eye.radius3
                      ]}
                      eyeColor={[
                        safeSettings.colors.eyeColor1.value,
                        safeSettings.colors.eyeColor2.value,
                        safeSettings.colors.eyeColor3.value
                      ]}
                      logoPaddingStyle={safeSettings.logo.paddingStyle}
                      logoPadding={9}
                      enableCORS={safeSettings.enableCORS || false}
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
