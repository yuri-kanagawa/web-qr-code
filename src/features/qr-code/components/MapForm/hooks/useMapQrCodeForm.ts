import { Language, QrCode } from '@/domains'
import { BrowserGeoLocationRepository } from '@/infrastructure/repositories/external/geoLocation/client'
import { IpApiGeoLocationRepository } from '@/infrastructure/repositories/external/geoLocation/server'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { registerQrCodeMapSchema, RegisterQrCodeMapSchema } from './zod'

type Props = {
  language: Language
  qr: QrCode
}

export const useMapQrCodeForm = ({ language, qr }: Props) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [isLoadingCurrentPosition, setIsLoadingCurrentPosition] =
    useState(false)

  const defaultValues: RegisterQrCodeMapSchema = useMemo(() => {
    return {
      latitude: qr.latitude?.value?.toString() || '',
      longitude: qr.longitude?.value?.toString() || '',
      language: language.value
    }
  }, [language, qr.latitude, qr.longitude])

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
        const repository = new IpApiGeoLocationRepository(language)
        const location = await repository.getLocationFromIpAddress()
        const initialValues: RegisterQrCodeMapSchema = {
          latitude: location.latitude.toString(),
          longitude: location.longitude.toString(),
          language: language.value
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
    return 'map-qr-generated'
  }

  const handleSetCurrentLocation = async () => {
    try {
      console.log('Getting current position...')
      setIsLoadingCurrentPosition(true)
      const repository = new BrowserGeoLocationRepository(language)
      const location = await repository.getCurrentPosition()
      console.log('Current position acquired:', location)
      setValue('latitude', location.latitude.toString())
      setValue('longitude', location.longitude.toString())
    } catch (error) {
      console.error('Failed to get current position:', error)
      // エラー通知などを追加する場合はここで
    } finally {
      setIsLoadingCurrentPosition(false)
      console.log('Current position loading finished')
    }
  }

  return {
    control,
    watch,
    onConfirm: handleConfirm,
    onDownload: () =>
      console.log('Download functionality temporarily disabled'),
    onSetCurrentLocation: handleSetCurrentLocation,
    formState,
    isLoadingLocation: isLoadingLocation || isLoadingCurrentPosition,
    ...rest
  }
}
