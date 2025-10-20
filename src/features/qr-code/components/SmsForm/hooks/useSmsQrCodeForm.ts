import { Language } from '@/domains/valueObjects/language'
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
  phoneNumber: string
  body: string
}

export const useSmsQrCodeForm = ({ language, phoneNumber, body }: Props) => {

  const resetPhoneNumber = useCallback(() => {
    SearchParamsManager.remove(['phoneNumber'])
  }, [])

  const resetBody = useCallback(() => {
    SearchParamsManager.remove(['body'])
  }, [])

  const defaultValues: RegisterQrCodeSmsSchema = useMemo(() => {
    return {
      phoneNumber,
      body
    }
  }, [phoneNumber, body])

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
    if (phoneNumber || body) {
      reset(defaultValues)
      resetPhoneNumber()
      resetBody()
    }
  }, [defaultValues, reset, resetPhoneNumber, resetBody, phoneNumber, body])

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
    return "qr-generated"
  }

  return {
    control,
    onConfirm: handleConfirm,
    onDownload: () => console.log("Download functionality temporarily disabled"),

    ...rest
  }
}
