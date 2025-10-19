import { Stack } from '@mui/material'
import { forwardRef } from 'react'
import { Controller } from 'react-hook-form'

import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { EncryptionSelect } from '@/ui/fragments/select'
import { PasswordTextField, SSIDTextField } from '@/ui/fragments/textField'

import { Language, QrCode } from '@/domains'
import { WiFiType } from '@/domains/valueObjects/wifiType'
import { useWiFiQrCodeForm } from './hooks'

interface Props {
  language: Language
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const WiFiForm = forwardRef<HTMLDivElement, Props>(
  ({ language, qr, onChange }, ref) => {
    const { control, onConfirm, onDownload, watch } = useWiFiQrCodeForm({
      ssid: qr.value.ssid || '',
      password: qr.value.password || '',
      type: qr.value.type || '',
      language
    })

    return (
      <FormButton
        onConfirm={onConfirm}
        onDownload={onDownload}
        language={language}
        qr={qr}
        onChange={onChange}
        ref={ref}
      >
        <FormCard cardProps={{ sx: { p: 2 } }}>
          <Stack spacing={3}>
            <Controller
              control={control}
              name="ssid"
              render={({
                field: { value, onChange: fieldOnChange },
                fieldState: { error }
              }) => (
                <SSIDTextField
                  value={value}
                  onChange={(newValue) => {
                    fieldOnChange(newValue) // react-hook-formの状態を更新
                    const newQr = qr.changeWifiSsid(newValue) // QrCodeの状態を更新
                    onChange(newQr) // 親コンポーネントに新しいQrCodeを渡す
                  }}
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
                              typeOnChange(selectedType.value) // react-hook-formの状態を更新
                              const newQr = qr.changeWifiType(
                                parseInt(selectedType.value)
                              ) // QrCodeの状態を更新
                              onChange(newQr) // 親コンポーネントに新しいQrCodeを渡す
                              if (selectedType.isNoPassword) {
                                passwordOnChange('')
                                const newQrWithoutPassword =
                                  newQr.changeWifiPassword('')
                                onChange(newQrWithoutPassword)
                              }
                            }}
                            language={language}
                            label={language.locale.word.select.encryptionType}
                          />
                          {!wifiType.isNoPassword && (
                            <PasswordTextField
                              value={password}
                              onChange={(newValue) => {
                                passwordOnChange(newValue) // react-hook-formの状態を更新
                                const newQr = qr.changeWifiPassword(newValue) // QrCodeの状態を更新
                                onChange(newQr) // 親コンポーネントに新しいQrCodeを渡す
                              }}
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
)
WiFiForm.displayName = 'WiFiForm'
