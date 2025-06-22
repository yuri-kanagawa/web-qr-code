'use client'

import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Stack } from '@mui/material'
import { useWiFiQrCodeForm } from '../../hooks/useWiFiQrCodeForm'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { SSIDTextField, PasswordTextField } from '@/ui/fragments/textField'
import { EncryptionSelect } from '@/ui/fragments/select'
import { toWifiSchema } from '../../hooks/utils'

export const WiFiForm: FC = () => {
  const { control, ref, onConfirm, onDownload, watch } = useWiFiQrCodeForm({})
  const formValues = watch()

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      ref={ref}
      value={toWifiSchema(formValues)}
    >
      <Stack spacing={3}>
        <Controller
          control={control}
          name="ssid"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <SSIDTextField
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <EncryptionSelect value={value} onChange={onChange} />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <PasswordTextField
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>
    </FormButton>
  )
}
