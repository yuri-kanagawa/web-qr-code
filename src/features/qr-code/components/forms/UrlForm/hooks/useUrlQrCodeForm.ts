import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'

import { useEffect, useMemo } from 'react'

import { Language, QrCode } from '@/domains'
import { useQrCode } from '@/hooks'
import {
  createRegisterQrCodeUrlSchema,
  type RegisterQrCodeUrlSchema
} from './zod'

type Props = {
  language: Language
  qr: QrCode
}

export const useUrlQRCodeForm = ({ language, qr }: Props) => {
  const { ref, onDownload } = useQrCode(language)

  const schema = useMemo(
    () => createRegisterQrCodeUrlSchema(language),
    [language]
  )

  const defaultValues: RegisterQrCodeUrlSchema = useMemo(() => {
    return {
      url: qr.url.value,
      language: language.value
    }
  }, [language.value, qr.url])

  const {
    handleSubmit,
    reset,
    control,
    watch,
    trigger,
    getFieldState,

    setFocus,
    ...rest
  } = useForm<RegisterQrCodeUrlSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    defaultValues
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeUrlSchema> = (
    errors
  ) => {
    if (errors.url) {
      return setFocus('url')
    }
  }

  const handleConfirm = async (): Promise<void> => {
    await trigger()
    const { error } = getFieldState('url')
    if (error) {
      setFocus('url')
      return
    }

    // URLタイプの場合は、入力されたURLをそのまま使って別タブで開く
    const currentUrl = watch('url')
    if (currentUrl && currentUrl.trim() !== '') {
      // URLが相対パスの場合は、http://を追加
      let urlToOpen = currentUrl.trim()
      if (
        !urlToOpen.startsWith('http://') &&
        !urlToOpen.startsWith('https://')
      ) {
        urlToOpen = `https://${urlToOpen}`
      }

      window.open(urlToOpen, '_blank')
      return
    }
  }
  return {
    control,
    watch,
    ref,
    onConfirm: handleConfirm,
    onDownload: handleSubmit(onDownload, submitErrorHandler),
    ...rest
  }
}
