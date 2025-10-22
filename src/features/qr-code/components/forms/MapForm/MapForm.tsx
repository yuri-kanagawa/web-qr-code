'use client'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { GoogleMap } from '@/ui/fragments/map'
import {
  LatitudeTextField,
  LongitudeTextField
} from '@/ui/fragments/textField/NumberTextField'
import { Button, Stack } from '@mui/material'
import { FC, useRef } from 'react'
import { Controller } from 'react-hook-form'
import { QrFormProps } from '../../types'
import { useMapQrCodeForm } from './hooks'

export const MapForm: FC<QrFormProps> = ({ language, qr, onChange }) => {
  const ref = useRef<HTMLDivElement>(null)
  const {
    control,
    onDownload,
    onConfirm,
    watch,
    onSetCurrentLocation,
    isLoadingLocation,
    formState: { errors, isValid }
  } = useMapQrCodeForm({ language, qr })

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
  console.log('isLoadingLocation:', isLoadingLocation)
  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      isValid={latitudeIsValid && longitudeIsValid}
      language={language}
      qr={qr}
      onChange={onChange}
      ref={ref}
    >
      <FormCard cardProps={{ sx: { p: 2 } }}>
        <Stack spacing={3}>
          <Button
            onClick={onSetCurrentLocation}
            variant="outlined"
            fullWidth
            disabled={isLoadingLocation}
          >
            {language.locale.message.common.buttons.getCurrentLocation}
          </Button>
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
                language={language}
                inputRef={inputRef}
                error={!!error}
                helperText={error?.message}
                isLoading={isLoadingLocation}
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
                language={language}
                inputRef={inputRef}
                error={!!error}
                helperText={error?.message}
                isLoading={isLoadingLocation}
              />
            )}
          />
          <GoogleMap
            isLoading={isLoadingLocation}
            value={{
              latitude: values.latitude
                ? parseFloat(values.latitude)
                : undefined,
              longitude: values.longitude
                ? parseFloat(values.longitude)
                : undefined
            }}
          />
        </Stack>
      </FormCard>
    </FormButton>
  )
}
