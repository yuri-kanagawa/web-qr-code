'use client'
import { FC } from 'react'
import { Controller, useFormState } from 'react-hook-form'
import { Stack, Box } from '@mui/material'
import { useMapQrCodeForm } from '../../hooks'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { LocationButton } from '@/ui/fragments/button'
import { GoogleMap } from '@/ui/fragments/map'
import {
  LatitudeTextField,
  LongitudeTextField
} from '@/ui/fragments/textField/NumberTextField'
import { formatMapUrl } from '../../hooks/utils'
import { usePathname } from 'next/navigation'

// パスから言語を抽出する関数
const getCurrentLanguage = (pathname: string): string => {
  const segments = pathname.split('/')
  const firstSegment = segments[1]

  if (firstSegment === 'ja' || firstSegment === 'fr') {
    return firstSegment
  }
  return 'en'
}

type Props = {}

export const MapForm: FC<Props> = () => {
  const pathname = usePathname()
  const currentLanguage = getCurrentLanguage(pathname)

  const {
    control,
    ref,
    onDownload,
    onConfirm,
    watch,
    onSetCurrentLocation,
    formState: { errors, isValid }
  } = useMapQrCodeForm({ language: currentLanguage })

  const values = watch()
  const latitudeIsValid = !errors.latitude
  const longitudeIsValid = !errors.longitude

  console.log('values:', values)
  console.log('errors:', errors)
  console.log(
    'latitudeIsValid:',
    latitudeIsValid,
    'longitudeIsValid:',
    longitudeIsValid
  )
  console.log('isValid:', isValid)
  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      value={formatMapUrl(watch())}
      isValid={latitudeIsValid && longitudeIsValid}
      ref={ref}
    >
      <Stack spacing={3}>
        <LocationButton
          onClick={onSetCurrentLocation}
          variant="outlined"
          fullWidth
        >
          現在地を取得
        </LocationButton>
        <Controller
          control={control}
          name="latitude"
          render={({
            field: { value, onChange, ref: inputRef },
            fieldState: { error }
          }) => (
            <LatitudeTextField
              value={value ? parseFloat(value) : undefined}
              onChange={(numValue: number) => onChange(numValue.toString())}
              inputRef={inputRef}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="longitude"
          render={({
            field: { value, onChange, ref: inputRef },
            fieldState: { error }
          }) => (
            <LongitudeTextField
              value={value ? parseFloat(value) : undefined}
              onChange={(numValue: number) => onChange(numValue.toString())}
              inputRef={inputRef}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <GoogleMap
          value={{
            latitude: values.latitude ? parseFloat(values.latitude) : undefined,
            longitude: values.longitude
              ? parseFloat(values.longitude)
              : undefined
          }}
        />
      </Stack>
    </FormButton>
  )
}
