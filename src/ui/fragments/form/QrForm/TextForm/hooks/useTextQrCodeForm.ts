import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import {
  createRegisterQrCodeTextSchema,
  type RegisterQrCodeTextSchema
} from './zod'

interface Props {
  text: string
  language: Language
}
export const useTextQrCodeForm = ({ text, language }: Props) => {
  const defaultValues: RegisterQrCodeTextSchema = {
    text
  }
  const { ref, onConfirm, onDownload } = useQrCode(language)

  const schema = useMemo(
    () => createRegisterQrCodeTextSchema(language),
    [language]
  )

  const { handleSubmit, trigger, setFocus, getFieldState, ...rest } =
    useForm<RegisterQrCodeTextSchema>({
      defaultValues,
      mode: 'onChange',
      resolver: zodResolver(schema)
    })
  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeTextSchema> = (
    errors
  ) => {
    console.error(errors)
    if (errors.text) {
      return setFocus('text')
    }
  }

  const handleConfirm = async (): Promise<string | undefined> => {
    await trigger()
    const { error } = getFieldState('text')
    if (error) {
      setFocus('text')
      return
    }
    return await onConfirm()
  }
  return {
    ref,
    onConfirm: handleConfirm,
    onDownload: handleSubmit(onDownload, submitErrorHandler),
    ...rest
  }
}
