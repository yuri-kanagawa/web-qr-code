import { useNotify, useQrcode, useQrScanner } from '@/hooks'
import { RegisterQrCodeUrlSchema } from '@/ui/pages/Url/hooks'
import { useEffect, useMemo } from 'react'
import {
  registerQrCodePhoneSchema,
  RegisterQrCodePhoneSchema
} from '@/ui/pages/Phone/hooks/zod'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { extractPngDataUrl } from '@/utils/qr'
import { addQueryParameter } from '@/utils/queryParameter'

export const usePhoneQrCodeForm = () => {
  const { cellPhone, setUrl, ref, setFile, file, onConfirm, onDownload } =
    useQrcode()

  const defaultValues: RegisterQrCodePhoneSchema = useMemo(() => {
    return {
      phoneNumber: cellPhone
    }
  }, [cellPhone])
  const {
    handleSubmit,
    reset,
    control,
    watch,
    trigger: validate,
    formState: { errors, isValid },
    setFocus,
    ...rest
  } = useForm<RegisterQrCodePhoneSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(registerQrCodePhoneSchema)
  })
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const { successNotify, warningNotify } = useNotify()

  const { trigger } = useQrScanner()

  const submitHandler: SubmitHandler<RegisterQrCodePhoneSchema> = async (
    data
  ) => {
    setUrl(data.phoneNumber)

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
      return setFocus('phoneNumber')
    }
  }
  const currentUrl = watch('phoneNumber')

  useEffect(() => {
    if (errors.phoneNumber) return
    addQueryParameter({ url: currentUrl })
  }, [errors.phoneNumber, currentUrl])
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
