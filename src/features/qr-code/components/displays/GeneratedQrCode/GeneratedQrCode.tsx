import React, { useEffect, useMemo, useState } from 'react'

import { Language, QrCode } from '@/domains'
import { useWindowSize } from '@/hooks'

import { QRCode, Stack } from '@/ui/cores'
import { CornerHighlightBox } from '@/ui/fragments/box'
import { IconButton } from '@mui/material'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'

type Props = {
  isValid?: boolean
  showHiddenIcon?: boolean
  height?: number
  width?: number
  qr: QrCode
}

const GeneratedQrCode = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      isValid,
      showHiddenIcon = false,
      height: propHeight,
      width: propWidth,
      qr
    },
    ref
  ) => {
    const { height, width, isOverLaptop } = useWindowSize()

    // qrがundefinedの場合のフォールバック
    const safeQr = qr || QrCode.default(Language.default())

    const maxSize = useMemo(() => {
      // 親から指定されたサイズがある場合はそれを使用
      if (propHeight && propWidth) {
        return Math.min(propHeight, propWidth) - 50
      }

      // デバイスに応じた最大表示サイズを取得
      const maxDisplaySize: number = isOverLaptop
        ? QrCode.LAPTOP_DISPLAY_SIZE
        : QrCode.MOBILE_DISPLAY_SIZE

      // QRコードのサイズと最大表示サイズの小さい方を返す
      // これにより、設定サイズが上限を超えても上限値までしか表示されない
      return Math.min(safeQr.size, maxDisplaySize)
    }, [height, width, propHeight, propWidth, isOverLaptop, safeQr.size])

    const [logoImage, setLogoImage] = useState<string | undefined>(undefined)

    // qr.settings.logoFileの変更を監視
    useEffect(() => {
      if (qr.settings.logoFile) {
        const convertImageToBase64 = async (file: File): Promise<string> => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(file)
          })
        }

        ;(async () => {
          const base64 = await convertImageToBase64(qr.settings.logoFile!)
          setLogoImage(base64)
        })()
      } else {
        setLogoImage(undefined)
      }
    }, [qr.settings.logoFile])

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
                {isValid &&
                  qr.qrValue.value &&
                  qr.qrValue.value.trim() !== '' && (
                    <>
                      {(() => {
                        const logoProps = logoImage
                          ? {
                              logoImage,
                              logoWidth: Math.floor(
                                (safeQr.settings.logo.width / 100) *
                                  safeQr.settings.size.value
                              ),
                              logoHeight: Math.floor(
                                (safeQr.settings.logo.height / 100) *
                                  safeQr.settings.size.value
                              ),
                              logoOpacity: safeQr.settings.logo.opacity,
                              logoPaddingStyle:
                                safeQr.settings.logo.paddingStyle,
                              logoPadding: 9
                            }
                          : {}

                        return (
                          <QRCode
                            key={logoImage ? 'with-logo' : 'without-logo'}
                            value={qr.qrValue.value}
                            size={maxSize}
                            bgColor={safeQr.settings.colors.bgColor.value}
                            fgColor={safeQr.settings.colors.fgColor.value}
                            ecLevel={
                              safeQr.settings.ecLevel.value as
                                | 'L'
                                | 'M'
                                | 'Q'
                                | 'H'
                            }
                            {...logoProps}
                            eyeRadius={[
                              safeQr.settings.eye.radius1,
                              safeQr.settings.eye.radius2,
                              safeQr.settings.eye.radius3
                            ]}
                            eyeColor={[
                              safeQr.settings.colors.eyeColor1.value,
                              safeQr.settings.colors.eyeColor2.value,
                              safeQr.settings.colors.eyeColor3.value
                            ]}
                            enableCORS={safeQr.settings.enableCORS || false}
                          />
                        )
                      })()}
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
