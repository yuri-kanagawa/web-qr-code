import React, { MutableRefObject, RefObject, useCallback } from 'react'
import { Button } from '@mui/material'
import QrScanner from 'qr-scanner'
import { useNotify } from '@/hooks/useNotify'

type Props = {
  // forwardedRef: RefObject<HTMLDivElement>
}

export const QrCheckButton = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { successNotify, errorNotify } = useNotify()
    const onClick = useCallback(async () => {
      const mutableRef = ref as MutableRefObject<HTMLDivElement | null>

      if (!mutableRef.current) {
        console.log('ref is null or undefined')
        return
      }

      // Access the first child as an HTMLCanvasElement
      const canvas = mutableRef.current.children[0] as HTMLCanvasElement
      if (!canvas) return
      const pngDataUrl = canvas.toDataURL('image/png')
      console.log('ganogaoe')
      console.log(pngDataUrl)
      // QRコードを読み取る
      try {
        const result = await QrScanner.scanImage(pngDataUrl, {
          returnDetailedScanResult: true
        })
        console.log(result)
        const qrData = result.data
        if (qrData.startsWith('https')) {
          return window.open(qrData)
        } else if (qrData.startsWith('sms:')) {
          return (window.location.href = qrData)
        }
      } catch (error) {
        console.log('fskll')
        errorNotify('読み込めない')
      }
    }, [ref, errorNotify])
    return (
      <Button variant={'contained'} onClick={onClick}>
        Confirm
      </Button>
    )
  }
)

QrCheckButton.displayName = 'QrCheckButton'

export default QrCheckButton
