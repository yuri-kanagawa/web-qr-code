import { FC, useCallback, useMemo } from 'react'

import { useNotify } from '@/hooks'

import { ReadQrFromFileUseCase } from '@/application/usecases'
import { Language } from '@/domains/valueObjects/language'
import { QrScannerRepository } from '@/infrastructure/repositories'
import { PathBuilder } from '@/lib/routing'
import { useQr } from '@/stores'
import { Button } from '@/ui/cores'
import { useRouter } from 'next/navigation'

type Props = {
  file: File | null
  language: Language
}

export const QrFileCheckButton: FC<Props> = ({ file, language }) => {
  const { errorNotify } = useNotify()
  const { push } = useRouter()
  const { setQr } = useQr()
  const locale = language.locale
  const readQrFromFileUseCase = useMemo(
    () => new ReadQrFromFileUseCase(new QrScannerRepository(), language),
    [language]
  )

  const onClick = useCallback(async () => {
    if (!file) return

    const result = await readQrFromFileUseCase.execute(file)

    if (result.isSuccess && result.qr) {
      // グローバルステートに保存
      setQr(result.qr)

      // 編集画面に遷移
      const pathBuilder = new PathBuilder(language)
      push(pathBuilder.edit.content)
    } else {
      errorNotify(
        result.errorMessage || locale.message.common.error.qrCodeReadFailed
      )
    }
  }, [errorNotify, file, locale, readQrFromFileUseCase, push, language, setQr])

  return (
    <Button onClick={onClick} variant="contained" disabled={!file}>
      {locale.word.buttons.editQrCode}
    </Button>
  )
}
