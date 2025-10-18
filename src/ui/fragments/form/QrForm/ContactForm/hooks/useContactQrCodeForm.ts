import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import {
  createRegisterQrCodeContactSchema,
  type RegisterQrCodeContactSchema
} from './zod'

interface Props {
  language: Language
  firstName: string
  lastName: string
  middleName: string
  email: string
  mobilePhone: string
  homePhone: string
  homeAddress: string
  homeUrl: string
  organization: string
  post: string
  workMobile: string
  workPhone: string
  workAddress: string
  workUrl: string
}

export function useContactQrCodeForm({
  language,
  firstName,
  lastName,
  middleName,
  email,
  mobilePhone,
  homePhone,
  homeAddress,
  homeUrl,
  organization,
  post,
  workMobile,
  workPhone,
  workAddress,
  workUrl
}: Props) {
  const { ref, onConfirm, onDownload } = useQrCode(language)
  const defaultValues: RegisterQrCodeContactSchema = {
    firstName,
    lastName,
    middleName,
    email,
    mobilePhone,
    homePhone,
    homeAddress,
    homeUrl,
    organization,
    post,
    workMobile,
    workPhone,
    workAddress,
    workUrl
  }

  const schema = useMemo(
    () => createRegisterQrCodeContactSchema(language),
    [language]
  )

  const { handleSubmit, setFocus, getFieldState, ...rest } =
    useForm<RegisterQrCodeContactSchema>({
      defaultValues,
      resolver: zodResolver(schema),
      mode: 'onChange'
    })

  const fieldsToCheck: (keyof RegisterQrCodeContactSchema)[] = [
    'email',
    'firstName',
    'lastName',
    'middleName',
    'mobilePhone',
    'homePhone',
    'homeAddress',
    'homeUrl',
    'organization',
    'post',
    'workMobile',
    'workPhone',
    'workAddress',
    'workUrl'
  ]

  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeContactSchema> = (
    errors
  ) => {
    console.error(errors)
    for (const field of fieldsToCheck) {
      if (errors[field]) {
        setFocus(field)
        return
      }
    }
  }

  const handleConfirm = async (): Promise<string | undefined> => {
    for (const field of fieldsToCheck) {
      const { error } = getFieldState(field)
      if (error) {
        submitErrorHandler({ [field]: error })
        return
      }
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
