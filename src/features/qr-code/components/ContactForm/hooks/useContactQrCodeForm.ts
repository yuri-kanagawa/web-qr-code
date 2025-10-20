import { Language, QrCode } from '@/domains'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import {
  createRegisterQrCodeContactSchema,
  type RegisterQrCodeContactSchema
} from './zod'

interface Props {
  language: Language
  qr: QrCode
}

export function useContactQrCodeForm({
  language,
  qr
}: Props) {
  const defaultValues: RegisterQrCodeContactSchema = {
    firstName: qr.value.firstName || '',
    lastName: qr.value.lastName || '',
    middleName: qr.value.middleName || '',
    email: qr.value.email || '',
    mobilePhone: qr.value.mobilePhone || '',
    homePhone: qr.value.homePhone || '',
    homeAddress: qr.value.homeAddress || '',
    homeUrl: qr.value.homeUrl || '',
    organization: qr.value.organization || '',
    post: qr.value.post || '',
    workMobile: qr.value.workMobile || '',
    workPhone: qr.value.workPhone || '',
    workAddress: qr.value.workAddress || '',
    workUrl: qr.value.workUrl || ''
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
    return "qr-generated"
  }

  return {
    onConfirm: handleConfirm,
    onDownload: () => console.log("Download functionality temporarily disabled"),
    ...rest
  }
}
