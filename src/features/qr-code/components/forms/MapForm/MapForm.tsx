'use client'
import { QrCode } from '@/domains'
import { FormButton } from '@/features/qr-code'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { GoogleMap } from '@/ui/fragments/map'
import {
  LatitudeTextField,
  LongitudeTextField
} from '@/ui/fragments/textField/NumberTextField'
import { Button, Stack } from '@mui/material'
import { FC, useRef } from 'react'
import { Controller } from 'react-hook-form'
import { useMapQrCodeForm } from './hooks'

interface Props {
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const MapForm: FC<Props> = ({ qr, onChange }) => {
  const ref = useRef<HTMLDivElement>(null)
  const {
    control,
    onDownload,
    onConfirm,
    watch,
    onSetCurrentLocation,
    isLoadingLocation,
    formState: { errors, isValid }
  } = useMapQrCodeForm({ qr })

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
            {qr.language.locale.message.common.buttons.getCurrentLocation}
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
                language={qr.language}
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
                language={qr.language}
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
