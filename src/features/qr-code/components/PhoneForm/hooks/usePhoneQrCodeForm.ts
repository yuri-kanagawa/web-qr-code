import { Language, QrCode } from '@/domains'
import { useQrCode } from '@/hooks'
import { useClientSearchParams } from '@/hooks/useClientSearchParams'
import { SearchParamsManager } from '@/lib/browser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useMemo } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { RegisterQrCodeUrlSchema } from '../../UrlForm/hooks'
import { registerQrCodePhoneSchema, RegisterQrCodePhoneSchema } from './zod'

type Props = {
  language: Language
  qr: QrCode
}

export const usePhoneQrCodeForm = ({ language, qr }: Props) => {
  const searchParams = useClientSearchParams()
  const phoneNumber = searchParams.get('phoneNumber') ?? ''
  const resetPhoneNumber = useCallback(() => {
    SearchParamsManager.remove(['phoneNumber'])
  }, [])

  const { ref, onConfirm, onDownload } = useQrCode(Language.default())

  const defaultValues: RegisterQrCodePhoneSchema = useMemo(() => {
    return {
      phoneNumber: qr.phoneNumber.value || phoneNumber
    }
  }, [qr.phoneNumber, phoneNumber])
  const {
    handleSubmit,
    reset,
    control,
    watch,
    trigger,
    formState: { errors, isValid },
    getFieldState,
    setFocus,
    ...rest
  } = useForm<RegisterQrCodePhoneSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(registerQrCodePhoneSchema)
  })
  useEffect(() => {
    if (phoneNumber) {
      reset(defaultValues)
      resetPhoneNumber()
    }
  }, [phoneNumber, reset, defaultValues, resetPhoneNumber])

  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeUrlSchema> = (
    errors
  ) => {
    console.error(errors)
    if (errors.url) {
      return setFocus('phoneNumber')
    }
  }

  const handleConfirm = async (): Promise<string | undefined> => {
    await trigger()
    const { error } = getFieldState('phoneNumber')
    if (error) {
      setFocus('phoneNumber')
      return
    }
    return await onConfirm()
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
