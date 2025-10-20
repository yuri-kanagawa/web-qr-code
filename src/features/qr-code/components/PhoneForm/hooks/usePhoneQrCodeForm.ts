import { Language, QrCode } from '@/domains'
import { useQrCode } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { RegisterQrCodeUrlSchema } from '../../UrlForm/hooks'
import { registerQrCodePhoneSchema, RegisterQrCodePhoneSchema } from './zod'

type Props = {
  language: Language
  qr: QrCode
}

export const usePhoneQrCodeForm = ({ language, qr }: Props) => {
  const { ref, onConfirm, onDownload } = useQrCode(Language.default())

  const defaultValues: RegisterQrCodePhoneSchema = useMemo(() => {
    return {
      phoneNumber: qr.phoneNumber.value
    }
  }, [qr.phoneNumber])
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
    reset(defaultValues)
  }, [defaultValues, reset])

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
