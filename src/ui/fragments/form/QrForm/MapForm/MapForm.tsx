'use client'
import { FC } from 'react'
import { Controller, useFormState } from 'react-hook-form'
import { Stack, Box, CircularProgress } from '@mui/material'
import { useMapQrCodeForm, formatMapUrl } from './hooks'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { LocationButton } from '@/ui/fragments/button'
import { GoogleMap } from '@/ui/fragments/map'
import {
  LatitudeTextField,
  LongitudeTextField
} from '@/ui/fragments/textField/NumberTextField'
import { Language } from '@/domains/valueObjects/language'

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
