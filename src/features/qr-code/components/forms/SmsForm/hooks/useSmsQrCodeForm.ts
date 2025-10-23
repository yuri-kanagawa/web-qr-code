import { QrCode } from '@/domains'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import {
  createRegisterQrCodeSmsSchema,
  type RegisterQrCodeSmsSchema
} from './zod'

interface Props {
  qr: QrCode
}

export const useSmsQrCodeForm = ({ qr }: Props) => {
  const defaultValues: RegisterQrCodeSmsSchema = useMemo(() => {
    return {
      phoneNumber: qr.phoneNumber.value,
      body: qr.body.value
    }
  }, [qr.phoneNumber, qr.body])

  const schema = useMemo(
    () => createRegisterQrCodeSmsSchema(qr.language),
    [qr.language]
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
