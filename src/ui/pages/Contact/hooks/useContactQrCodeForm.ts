import {
  registerQrCodeContactSchema,
  RegisterQrCodeContactSchema
} from '@/ui/pages/Contact/hooks/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQrCode } from '@/hooks'


export function useContactQrCodeForm() {
  const { ref, onConfirm, onDownload } = useQrCode()
  const defaultValues: RegisterQrCodeContactSchema = {
    firstName: '',
    lastName: '',
    middleName: '',
    phoneNumber: '',
    organization: '',
    post: '',
    businessCellularTelephone: '',
    privateCellularTelephone: '',
    email: '',
    address: '',
    url: ''
  }
  const { handleSubmit, setFocus, getFieldState, ...rest } = useForm<RegisterQrCodeContactSchema>({
    defaultValues,
    resolver: zodResolver(registerQrCodeContactSchema),
    mode: 'onChange'
  })
    const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeContactSchema> = (
      errors
    ) => {
      console.error(errors)
      if (errors.email) {
        return setFocus('email')
      }
    }
  const handleConfirm = async (): Promise<string | undefined> => {
    const {error: emailError } = getFieldState('email')
    if (emailError) {
      submitErrorHandler(emailError)
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
