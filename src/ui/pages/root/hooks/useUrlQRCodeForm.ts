import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import {
  RegisterQrCodeUrlSchema,
  registerQrCodeUrlSchema
} from '@/ui/pages/root/hooks/validation'

import { useEffect, useMemo } from 'react'

import { usePathQueryParameter } from './usePathQueryParameter'

export const useUrlQRCodeForm = () => {
  const { url, setUrl } = usePathQueryParameter()

  const defaultValues: RegisterQrCodeUrlSchema = useMemo(() => {
    return {
      url
    }
  }, [url])

  const { handleSubmit, reset, control, ...rest } =
    useForm<RegisterQrCodeUrlSchema>({
      resolver: zodResolver(registerQrCodeUrlSchema),
      mode: 'onChange',
      defaultValues
    })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const submitHandler: SubmitHandler<RegisterQrCodeUrlSchema> = (data) => {
    setUrl(data.url)
  }

  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeUrlSchema> = (
    errors
  ) => {
    console.error(errors)
  }

  return {
    onSubmit: handleSubmit(submitHandler, submitErrorHandler),
    control,
    ...rest
  }
}
