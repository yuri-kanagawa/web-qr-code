import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { FormButton } from '@/features/qr-code'
import { FormCard } from '@/ui/fragments/form'
import { BodyTextField } from '@/ui/fragments/textField'
import { CellPhoneTextField } from '@/ui/fragments/textField/PhoneTextField'
import { Stack } from '@mui/material'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { useSmsQrCodeForm } from './hooks/useSmsQrCodeForm'

interface Props {
  language: Language
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const SmsForm: FC<Props> = ({ language, qr, onChange }) => {
  const {
    control,
    ref,
    onConfirm,
    onDownload,
    watch,
    formState: { isValid }
  } = useSmsQrCodeForm({
    language,
    qr
  })

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      isValid={isValid}
      language={language}
      qr={qr}
      onChange={onChange}
      ref={ref}
    >
      <FormCard cardProps={{ sx: { p: 2 } }}>
        <Stack spacing={3}>
          <Controller
            control={control}
            name="phoneNumber"
            render={({
              field: { value, onChange, ref: inputRef },
              formState: { isValid },
              fieldState: { error }
            }) => (
              <CellPhoneTextField
                value={value}
                onChange={(newValue) => {
                  onChange(newValue) // react-hook-formの状態を更新
                  const newQr = qr.changePhoneNumber(newValue) // QrCodeの状態を更新
                  onChange(newQr) // 親コンポーネントに新しいQrCodeを渡す
                }}
                error={!!error}
                helperText={error?.message}
                inputRef={inputRef}
                language={language}
                isRequired={false}
              />
            )}
          />
          <Controller
            control={control}
            name="body"
            render={({
              field: { value, onChange, ref: inputRef },
              formState: { isValid },
              fieldState: { error }
            }) => (
              <BodyTextField
                value={value}
                onChange={(newValue) => {
                  onChange(newValue) // react-hook-formの状態を更新
                  const newQr = qr.changeBody(newValue) // QrCodeの状態を更新
                  onChange(newQr) // 親コンポーネントに新しいQrCodeを渡す
                }}
                inputRef={inputRef}
                helperText={error?.message}
                error={!!error}
                language={language}
              />
            )}
          />
        </Stack>
      </FormCard>
    </FormButton>
  )
}
