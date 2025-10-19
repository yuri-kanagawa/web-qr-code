import { Language } from '@/domains/valueObjects/language'
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
    return 'text-qr-generated'
  }

  const handleDownload = () => {
    // ダウンロード機能は一時的に無効化
    console.log('Download functionality temporarily disabled')
  }

  return {
    onConfirm: handleConfirm,
    onDownload: handleDownload,
    ...rest
  }
}
