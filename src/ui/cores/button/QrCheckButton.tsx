import React, {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect
} from 'react'
import { Button } from '@mui/material'
import QrScanner from 'qr-scanner'
import { useNotify } from '@/hooks/useNotify'
import { extractPngDataUrl, isUrl } from '@/utils/qr'
import { useQrScanner } from '@/api/qrScanner/useQrScanner'

type Props = {}

export const QrCheckButton = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { successNotify, errorNotify } = useNotify()
    const { trigger } = useQrScanner()
    const onClick = useCallback(async () => {
      const mutableRef = ref as MutableRefObject<HTMLDivElement | null>
      const pngDataUrl = extractPngDataUrl(mutableRef)
      if (!pngDataUrl) return

      try {
        const result = await trigger(pngDataUrl)
        const qrData = result.data
        if (isUrl(qrData)) {
          return window.open(qrData)
        } else if (qrData.startsWith('sms:')) {
          return (window.location.href = qrData)
        }
      } catch (error) {
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
