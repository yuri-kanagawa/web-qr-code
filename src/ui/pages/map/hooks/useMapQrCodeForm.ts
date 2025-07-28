import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { useQrCode } from '@/hooks'
import { useEffect, useMemo } from 'react'
import { registerQrCodeMapSchema, RegisterQrCodeMapSchema } from './zod'

type Props = {
  language?: string
}

export const useMapQrCodeForm = ({ language = 'en' }: Props = {}) => {
  const { ref, onConfirm, onDownload } = useQrCode()

  const defaultValues: RegisterQrCodeMapSchema = useMemo(() => {
    return {
      latitude: '',
      longitude: '',
      language
    }
  }, [language])

  const {
    handleSubmit,
    reset,
    control,
    watch,
    trigger,
    getFieldState,
    setFocus,
    setValue,
    formState,
    ...rest
  } = useForm<RegisterQrCodeMapSchema>({
    resolver: zodResolver(registerQrCodeMapSchema),
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    defaultValues
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeMapSchema> = (
    errors
  ) => {
    console.error(errors)
    if (errors.latitude) {
      return setFocus('latitude')
    }
    if (errors.longitude) {
      return setFocus('longitude')
    }
  }

  const handleConfirm = async (): Promise<string | undefined> => {
    await trigger()
    const { error: latitudeError } = getFieldState('latitude')
    const { error: longitudeError } = getFieldState('longitude')
    
    if (latitudeError) {
      setFocus('latitude')
      return
    }
    if (longitudeError) {
      setFocus('longitude')
      return
    }
    return await onConfirm()
  }

  const handleSetCurrentLocation = (location: { lat: number; lng: number }) => {
    setValue('latitude', location.lat.toString())
    setValue('longitude', location.lng.toString())
  }

  return {
    control,
    watch,
    ref,
    onConfirm: handleConfirm,
    onDownload: handleSubmit(onDownload, submitErrorHandler),
    onSetCurrentLocation: handleSetCurrentLocation,
    formState,
    ...rest
  }
} 