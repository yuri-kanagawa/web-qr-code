'use client'

import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Stack } from '@mui/material'
import { useWiFiQrCodeForm } from '../../hooks/useWiFiQrCodeForm'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { SSIDTextField, PasswordTextField } from '@/ui/fragments/textField'
import { EncryptionSelect } from '@/ui/fragments/select'
import { toWifiSchema } from '../../hooks/utils'
import { isEncryptionNonpass } from '@/constants/encryption'

export const WiFiForm: FC = () => {
  const { control, ref, onConfirm, onDownload, watch } = useWiFiQrCodeForm({})

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      ref={ref}
      value={toWifiSchema(watch())}
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
          render={({
            field: { value: type, onChange: typeOnChange },
            fieldState: { error }
          }) => (
            <>
              <Controller
                control={control}
                name="password"
                render={({
                  field: { value: password, onChange: passwordOnChange },
                  fieldState: { error }
                }) => (
                  <>
                    <EncryptionSelect
                      value={type}
                      onChange={(value) => {
                        typeOnChange(value)
                        if (isEncryptionNonpass(value)) {
                          passwordOnChange('')
                        }
                      }}
                    />
                    {!isEncryptionNonpass(type) && (
                      <PasswordTextField
                        value={password}
                        onChange={passwordOnChange}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  </>
                )}
              />
            </>
          )}
        />
      </Stack>
    </FormButton>
  )
}
