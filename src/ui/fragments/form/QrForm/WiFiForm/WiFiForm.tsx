import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Stack } from '@mui/material'

import { FormButton } from '@/ui/fragments/form/FormButton'
import { SSIDTextField, PasswordTextField } from '@/ui/fragments/textField'
import { EncryptionSelect } from '@/ui/fragments/select'

import { WiFiType } from '@/domains/valueObjects/wifiType'
import { toWifiSchema, useWiFiQrCodeForm } from './hooks'
import { Language } from '@/domains'

interface Props {
  ssid: string
  password: string
  type: string
  language: Language
}

export const WiFiForm: FC<Props> = ({ ssid, password, type, language }) => {
  const { control, ref, onConfirm, onDownload, watch } = useWiFiQrCodeForm({
    ssid,
    password,
    type,
    language
  })

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      language={language}
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
                        if (WiFiType.isNoPassword(value)) {
                          passwordOnChange('')
                        }
                      }}
                      language={language}
                    />
                    {!WiFiType.isNoPassword(type) && (
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
