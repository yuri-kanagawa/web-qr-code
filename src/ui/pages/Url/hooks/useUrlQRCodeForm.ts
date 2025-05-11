import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import {
  RegisterQrCodeUrlSchema,
  registerQrCodeUrlSchema
} from '@/ui/pages/Url/hooks/zod'

import { MutableRefObject, useEffect, useMemo, useRef } from 'react'

import { useNotify } from '@/hooks/useNotify'
import { extractPngDataUrl } from '@/utils/qr'
import { useQrScanner } from '@/hooks/useQrScanner'
import {
  addQueryParameter,
  removeQueryParamFromCurrentURL
} from '@/utils/queryParameter'
import { isValidUrl } from '@/utils/regexp'
import { useQrcode } from '@/hooks'

export const useUrlQRCodeForm = () => {
  const { url, setUrl, ref, setFile, file, onConfirm, onDownload } = useQrcode()

  const defaultValues: RegisterQrCodeUrlSchema = useMemo(() => {
    return {
      url
    }
  }, [url])

  const {
    handleSubmit,
    reset,
    control,
    watch,
    trigger: validate,
    formState: { errors, isValid },
    setFocus,
    ...rest
  } = useForm<RegisterQrCodeUrlSchema>({
    resolver: zodResolver(registerQrCodeUrlSchema),
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    defaultValues
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const { successNotify, warningNotify } = useNotify()

  const { trigger } = useQrScanner()

  const submitHandler: SubmitHandler<RegisterQrCodeUrlSchema> = async (
    data
  ) => {
    setUrl(data.url)

    successNotify('作成しました')
    const qrData = extractPngDataUrl(ref)
    if (!qrData) return
    try {
      await trigger(qrData)
    } catch (e) {
      warningNotify('読み込み失敗')
    }
  }

  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeUrlSchema> = (
    errors
  ) => {
    console.error(errors)
    if (errors.url) {
      return setFocus('url')
    }
  }
  const currentUrl = watch('url')

  useEffect(() => {
    if (errors.url) return
    addQueryParameter({ url: currentUrl })
  }, [errors.url, currentUrl])
  const handleConfirm = async (): Promise<string | undefined> => {
    if (!isValid) {
      submitErrorHandler(errors)
      return
    }
    return await onConfirm()
  }
  return {
    onSubmit: handleSubmit(submitHandler, submitErrorHandler),
    control,
    watch,
    setFile,
    file,
    ref,
    onConfirm: handleConfirm,
    onDownload: handleSubmit(onDownload, submitErrorHandler),
    ...rest
  }
}
