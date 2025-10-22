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

export function useContactQrCodeForm({ language, qr }: Props) {
  const defaultValues: RegisterQrCodeContactSchema = {
    firstName: qr.firstName.value,
    lastName: qr.lastName.value,
    middleName: qr.middleName.value,
    email: qr.emailContact.value,
    mobilePhone: qr.mobilePhone.value,
    homePhone: qr.homePhone.value,
    homeAddress: qr.homeAddress.value,
    homeUrl: qr.homeUrl.value,
    organization: qr.organization.value,
    post: qr.post.value,
    workMobile: qr.workMobile.value,
    workPhone: qr.workPhone.value,
    workAddress: qr.workAddress.value,
    workUrl: qr.workUrl.value
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
    return 'qr-generated'
  }

  return {
    onConfirm: handleConfirm,
    onDownload: () =>
      console.log('Download functionality temporarily disabled'),
    ...rest
  }
}
