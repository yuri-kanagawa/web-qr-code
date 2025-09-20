import {
  registerQrCodeContactSchema,
  RegisterQrCodeContactSchema
} from './zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQrCode } from '@/hooks'

interface Props {
  language: string
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

export function useContactQrCodeForm({ firstName, lastName, middleName, email, organization, url ,phoneNumber, post, businessCellularTelephone, privateCellularTelephone, address}: Props) {
  const { ref, onConfirm, onDownload } = useQrCode()
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
  const { handleSubmit, setFocus, getFieldState, ...rest } =
    useForm<RegisterQrCodeContactSchema>({
      defaultValues,
      resolver: zodResolver(registerQrCodeContactSchema),
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
