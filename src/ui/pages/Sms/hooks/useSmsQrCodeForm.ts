import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, useForm, useWatch } from 'react-hook-form';
import { registerQrCodeSmsSchema, RegisterQrCodeSmsSchema } from './zod';
import { useQrCode } from '@/hooks';
export const useSmsQrCodeForm = () => {
  const { ref, onConfirm, onDownload } = useQrCode()
  const defaultValues: RegisterQrCodeSmsSchema = {
    phoneNumber: '',
    body: ''
  } 
  const {handleSubmit,trigger,setFocus, getFieldState ,control , ...rest} = useForm<RegisterQrCodeSmsSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(registerQrCodeSmsSchema)
  })

    const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeSmsSchema> = (
      errors
    ) => {
      console.error(errors)
      if (errors.phoneNumber) {
        return setFocus('phoneNumber')
      }

      if (errors.body) {
        return setFocus('body')
      }

    }
  
    const handleConfirm = async (): Promise<string | undefined> => {
      await trigger()
      const { error } = getFieldState('phoneNumber')
      if (error) {
        setFocus('phoneNumber')
        return
      }
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
