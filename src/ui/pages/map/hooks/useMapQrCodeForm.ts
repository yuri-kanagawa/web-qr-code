import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { useQrCode } from '@/hooks'
import { useEffect, useMemo, useState } from 'react'
import { registerQrCodeMapSchema, RegisterQrCodeMapSchema } from './zod'
import { getLocationFromIP } from '@/utils/geolocation'

type Props = {
  language?: string
}

export const useMapQrCodeForm = ({ language = 'en' }: Props = {}) => {
  const { ref, onConfirm, onDownload } = useQrCode()
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)

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

  // IPアドレスから位置情報を取得して初期値として設定
  useEffect(() => {
    const fetchInitialLocation = async () => {
      try {
        setIsLoadingLocation(true)
        const location = await getLocationFromIP()
        const initialValues: RegisterQrCodeMapSchema = {
          latitude: location.latitude.toString(),
          longitude: location.longitude.toString(),
          language
        }
        reset(initialValues)
        console.log('Initial location set from IP:', location)
      } catch (error) {
        console.error('Failed to fetch initial location:', error)
        reset(defaultValues)
      } finally {
        setIsLoadingLocation(false)
      }
    }

    fetchInitialLocation()
  }, [defaultValues, reset, language])

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
    isLoadingLocation,
    ...rest
  }
} 