import { useNotify, useQrCode, useQrScanner } from '@/hooks'
import { RegisterQrCodeUrlSchema } from '@/ui/pages/url/hooks'
import { useEffect, useMemo } from 'react'
import {
  registerQrCodePhoneSchema,
  RegisterQrCodePhoneSchema
} from '@/ui/pages/phone/hooks/zod'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSocialMediaQrCodeSchema, RegisterSocialMediaQrCodeSchema } from './zod'

type Props = {
  language: string
}
export const useSocialMediaQrCodeForm = ({language}: Props) => {
  const { ref, onConfirm, onDownload } = useQrCode()
  const defaultValues: RegisterSocialMediaQrCodeSchema = {
    socialMedia: [{
      socialMedia: 0,
      label: '',
      url: ''
    }],
    language
  }
  const { handleSubmit, control, ...rest } = useForm<RegisterSocialMediaQrCodeSchema>({
    defaultValues,
    resolver: zodResolver(registerSocialMediaQrCodeSchema),
    mode: 'onChange'
  })

  const submitErrorHandler: SubmitErrorHandler<RegisterSocialMediaQrCodeSchema> = (
    errors
  ) => {
    console.error(errors)
  }

  const handleConfirm = async (): Promise<string | undefined> => {
    return await onConfirm()
  }

  return {
    ref,
    control,
    onConfirm: handleConfirm,
    onDownload: handleSubmit(onDownload, submitErrorHandler),
    ...rest
  }
}
