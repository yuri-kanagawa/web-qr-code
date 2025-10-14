import { FC, useCallback } from 'react'

import { useNotify, useQrScanner } from '@/hooks'

import { Language } from '@/domains/valueObjects/language'
import { Qr } from '@/domains/valueObjects/qr'
import { Button } from '@/ui/cores'

type Props = {
  file: File | null
  setQr: (qr: Qr) => void
  language?: Language
}

export const QrFileCheckButton: FC<Props> = ({
  file,
  setQr,
  language = Language.default()
}) => {
  const { errorNotify } = useNotify()
  const { trigger } = useQrScanner()

  const onClick = useCallback(async () => {
    if (!file) return
    const objectUrl = URL.createObjectURL(file)

    try {
      const result = await trigger(objectUrl)
      const qrResult = Qr.create(result.data, language)

      if (qrResult.isSuccess && qrResult.qr) {
        setQr(qrResult.qr)
      } else {
        errorNotify(qrResult.error?.message || '無効なQRコード')
      }
    } catch (error) {
      errorNotify('読み込めない')
    }
  }, [errorNotify, file, language, setQr, trigger])

  return <Button onClick={onClick}>確認</Button>
}
