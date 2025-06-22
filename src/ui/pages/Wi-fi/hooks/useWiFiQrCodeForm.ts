import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, useForm, useWatch } from 'react-hook-form';
import { registerQrCodeWiFiSchema, RegisterQrCodeWiFiSchema } from './zod';
import { useQrCode } from '@/hooks';
import { useEffect, useMemo } from 'react';

type Props = {}

export const useWiFiQrCodeForm = ({}: Props) => {
  const { ref, onConfirm, onDownload, phoneNumber, body , resetPhoneNumber, resetBody } = useQrCode()
  const defaultValues: RegisterQrCodeWiFiSchema = useMemo(() =>{
    return {
      ssid :'',
      password: '',
      type:''
    } 
  } ,[phoneNumber, body])
  const {handleSubmit,trigger,setFocus, getFieldState ,control, reset , ...rest} = useForm<RegisterQrCodeWiFiSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(registerQrCodeWiFiSchema)
  })
  useEffect(() => {
      if (phoneNumber || body){
        reset(defaultValues)
        resetPhoneNumber()
        resetBody()
      }

  },[defaultValues, reset, resetPhoneNumber,resetBody ])

    const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeWiFiSchema> = (
      errors
    ) => {
      console.error(errors)
      // if (errors.phoneNumber) {
      //   return setFocus('phoneNumber')
      // }

      // if (errors.body) {
      //   return setFocus('body')
      // }

    }
  
    const handleConfirm = async (): Promise<string | undefined> => {
      await trigger()
      // const { error } = getFieldState('phoneNumber')
      // if (error) {
      //   setFocus('phoneNumber')
      //   return
      // }
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
