import { Language, QrCode } from '@/domains'
import { SearchParamsManager } from '@/lib/browser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useMemo } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import {
  createRegisterQrCodeSmsSchema,
  type RegisterQrCodeSmsSchema
} from './zod'

interface Props {
  language: Language
  qr: QrCode
}

export const useSmsQrCodeForm = ({ language, qr }: Props) => {
  const resetPhoneNumber = useCallback(() => {
    SearchParamsManager.remove(['phoneNumber'])
  }, [])

  const resetBody = useCallback(() => {
    SearchParamsManager.remove(['body'])
  }, [])

  const defaultValues: RegisterQrCodeSmsSchema = useMemo(() => {
    return {
      phoneNumber: qr.phoneNumber.value,
      body: qr.body.value
    }
  }, [qr.phoneNumber, qr.body])

  const schema = useMemo(
    () => createRegisterQrCodeSmsSchema(language),
    [language]
  )

  const {
    handleSubmit,
    trigger,
    setFocus,
    getFieldState,
    control,
    reset,
    ...rest
  } = useForm<RegisterQrCodeSmsSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeSmsSchema> = (
    errors
  ) => {
    console.error(errors)
    if (errors.phoneNumber) {
      return setFocus('phoneNumber')
    }

    if (errors.body) {
      return setFocus('body')
    }
  }

  const handleConfirm = async (): Promise<string | undefined> => {
    await trigger()
    const { error } = getFieldState('phoneNumber')
    if (error) {
      setFocus('phoneNumber')
      return
    }
    return 'qr-generated'
  }

  return {
    control,
    onConfirm: handleConfirm,
    onDownload: () =>
      console.log('Download functionality temporarily disabled'),

    ...rest
  }
}
