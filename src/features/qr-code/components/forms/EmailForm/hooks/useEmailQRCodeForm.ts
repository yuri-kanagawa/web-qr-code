import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'

import { useEffect, useMemo } from 'react'

import { QrCode } from '@/domains'
import {
  createRegisterQrCodeEmailSchema,
  type RegisterQrCodeEmailSchema
} from './zod'

type Props = {
  qr: QrCode
}

export const useEmailQRCodeForm = ({ qr }: Props) => {
  const defaultValues: RegisterQrCodeEmailSchema = useMemo(() => {
    return {
      email: qr.email.value,
      subject: qr.subject.value,
      body: qr.body.value,
      language: qr.language.value
    }
  }, [qr.language.value, qr.email, qr.subject, qr.body])

  const schema = useMemo(
    () => createRegisterQrCodeEmailSchema(qr.language),
    [qr.language]
  )

  const { handleSubmit, reset, watch, getFieldState, setFocus, ...rest } =
    useForm<RegisterQrCodeEmailSchema>({
      resolver: zodResolver(schema),
      mode: 'onChange',
      reValidateMode: 'onSubmit',
      defaultValues
    })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeEmailSchema> = (
    errors
  ) => {
    console.error(errors)
    if (errors.email) {
      return setFocus('email')
    }
  }

  const handleConfirm = async (): Promise<string | undefined> => {
    const { error: emailError } = getFieldState('email')
    if (emailError) {
      submitErrorHandler(emailError)
      return
    }
    return 'qr-generated'
  }
  return {
    onConfirm: handleConfirm,
    onDownload: () =>
      console.log('Download functionality temporarily disabled'),
    ...rest,
    watch
  }
}
