import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { createRegisterQrCodeContactSchema, type RegisterQrCodeContactSchema } from './zod'

interface Props {
  language: Language
  firstName: string
  lastName: string
  middleName: string
  email: string
  organization: string
  url: string
  phoneNumber: string
  post: string
  businessCellularTelephone: string
  privateCellularTelephone: string
  address: string
}

export function useContactQrCodeForm({
  language,
  firstName,
  lastName,
  middleName,
  email,
  organization,
  url,
  phoneNumber,
  post,
  businessCellularTelephone,
  privateCellularTelephone,
  address
}: Props) {
  const { ref, onConfirm, onDownload } = useQrCode(language)
  const defaultValues: RegisterQrCodeContactSchema = {
    firstName,
    lastName,
    middleName,
    phoneNumber,
    organization,
    post,
    businessCellularTelephone,
    privateCellularTelephone,
    email,
    address,
    url
  }

  const schema = useMemo(() => createRegisterQrCodeContactSchema(language), [language])

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
    'phoneNumber',
    'organization',
    'address',
    'url'
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
