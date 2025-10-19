import { Stack } from '@mui/material'
import { FC, useState } from 'react'
import { Controller } from 'react-hook-form'

import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { EncryptionSelect } from '@/ui/fragments/select'
import { PasswordTextField, SSIDTextField } from '@/ui/fragments/textField'

import { Language, QrCodeSettings } from '@/domains'
import { WiFiType } from '@/domains/valueObjects/wifiType'
import { toWifiSchema, useWiFiQrCodeForm } from './hooks'

interface Props {
  ssid: string
  password: string
  type: string
  language: Language
}

export const WiFiForm: FC<Props> = ({ ssid, password, type, language }) => {
  const [settings, setSettings] = useState<QrCodeSettings>(QrCodeSettings.default())
  
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
      settings={settings}
      onChange={setSettings}
      ref={ref}
      value={toWifiSchema(watch())}
    >
      <FormCard cardProps={{ sx: { p: 2 } }}>
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
            }) => {
              const wifiTypeResult = WiFiType.create(type, language)
              const wifiType =
                wifiTypeResult.isSuccess && wifiTypeResult.wifiType
                  ? wifiTypeResult.wifiType
                  : WiFiType.wpa(language)

              return (
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
                          value={wifiType}
                          onChange={(selectedType) => {
                            typeOnChange(selectedType.value)
                            if (selectedType.isNoPassword) {
                              passwordOnChange('')
                            }
                          }}
                          language={language}
                          label={language.locale.word.select.encryptionType}
                        />
                        {!wifiType.isNoPassword && (
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
              )
            }}
          />
        </Stack>
      </FormCard>
    </FormButton>
  )
}
