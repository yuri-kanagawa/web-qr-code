'use client'
import { Language } from '@/domains/valueObjects/language'
import { LocationButton } from '@/ui/fragments/button'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { GoogleMap } from '@/ui/fragments/map'
import {
  LatitudeTextField,
  LongitudeTextField
} from '@/ui/fragments/textField/NumberTextField'
import { Stack } from '@mui/material'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { formatMapUrl, useMapQrCodeForm } from './hooks'

type Props = {
  language: Language
}

export const MapForm: FC<Props> = ({ language }) => {
  const {
    control,
    ref,
    onDownload,
    onConfirm,
    watch,
    onSetCurrentLocation,
    isLoadingLocation,
    formState: { errors, isValid }
  } = useMapQrCodeForm({ language })

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
      language={language}
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
          isLoading={isLoadingLocation}
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
