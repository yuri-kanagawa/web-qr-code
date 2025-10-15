import { FC, useCallback, useMemo } from 'react'

import { useNotify } from '@/hooks'

import { ReadQrFromFileUseCase } from '@/application/usecases'
import { Language } from '@/domains/valueObjects/language'
import { Qr } from '@/domains/valueObjects/qr'
import { QrScannerRepository } from '@/infrastructure/repositories'
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
  const readQrFromFileUseCase = useMemo(
    () => new ReadQrFromFileUseCase(new QrScannerRepository()),
    []
  )

  const onClick = useCallback(async () => {
    if (!file) return

    try {
      const qr = await readQrFromFileUseCase.execute(file, language)
      setQr(qr)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'QRコードの読み込みに失敗しました'
      errorNotify(message)
    }
  }, [errorNotify, file, language, readQrFromFileUseCase, setQr])

  return <Button onClick={onClick}>確認</Button>
}
