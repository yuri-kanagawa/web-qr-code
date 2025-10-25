import { FC, useCallback, useMemo } from 'react'

import { useNotify } from '@/hooks'

import { ReadQrFromFileUseCase } from '@/application/usecases'
import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { QrScannerRepository } from '@/infrastructure/repositories'
import { Button } from '@/ui/cores'

type Props = {
  file: File | null
  setQr: (qr: QrCode) => void
  language: Language
}

export const QrFileCheckButton: FC<Props> = ({ file, setQr, language }) => {
  const { errorNotify } = useNotify()
  const locale = language.locale
  const readQrFromFileUseCase = useMemo(
    () => new ReadQrFromFileUseCase(new QrScannerRepository(), language),
    [language]
  )

  const onClick = useCallback(async () => {
    if (!file) return

    const result = await readQrFromFileUseCase.execute(file)

    if (result.isSuccess && result.qr) {
      setQr(result.qr)
    } else {
      errorNotify(
        result.errorMessage || locale.message.common.error.qrCodeReadFailed
      )
    }
  }, [errorNotify, file, locale, readQrFromFileUseCase, setQr])

  return (
    <Button onClick={onClick} variant="contained" disabled={!file}>
      {locale.word.buttons.read}
    </Button>
  )
}
