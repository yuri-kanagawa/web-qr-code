import { Button } from '@mui/material'
import { FC, MutableRefObject, useCallback } from 'react'
import { extractPngDataUrl, isSms, isUrl } from '@/utils/qr'
import { useNotify, useQrScanner } from '@/hooks'

type Props = {
  file: File | null
  setQrInformation: (value: string) => void
}

export const QrFileCheckButton: FC<Props> = ({ file, setQrInformation }) => {
  const { successNotify, errorNotify } = useNotify()
  const { trigger } = useQrScanner()

  const onClick = useCallback(async () => {
    if (!file) return
    const objectUrl = URL.createObjectURL(file)

    try {
      const result = await trigger(objectUrl)

      setQrInformation(result.data)
      // if (isUrl(qrData)) {
      //   return window.open(qrData)
      // } else if (isSms(qrData)) {
      //   return (window.location.href = qrData)
      // }
    } catch (error) {
      errorNotify('読み込めない')
    }
  }, [errorNotify])
  return <Button onClick={onClick}>確認</Button>
}
