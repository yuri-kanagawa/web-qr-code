import { Country, QrCode } from '@/domains'
import { PhoneTextField } from '@/features/country'
import { FormButton } from '@/features/qr-code'
import { FormCard } from '@/ui/fragments/form'
import { BodyTextField } from '@/ui/fragments/textField'
import { Stack } from '@mui/material'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { useSmsQrCodeForm } from './hooks/useSmsQrCodeForm'

interface Props {
  qr: QrCode
  onChange: (qr: QrCode) => void
  detectedCountry?: Country | null
  isCountryDetecting?: boolean
}

export const SmsForm: FC<Props> = ({
  qr,
  onChange,
  detectedCountry,
  isCountryDetecting
}) => {
  const {
    control,
    onConfirm,
    onDownload,
    watch,
    formState: { isValid }
  } = useSmsQrCodeForm({
    qr
  })

  return (
    <FormButton isValid={isValid} qr={qr} onChange={onChange}>
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
              <PhoneTextField
                value={value}
                onChange={(newValue) => {
                  onChange(newValue) // react-hook-formの状態を更新
                  const newQr = qr.changePhoneNumber(newValue) // QrCodeの状態を更新
                  onChange(newQr) // 親コンポーネントに新しいQrCodeを渡す
                }}
                error={!!error}
                helperText={error?.message}
                inputRef={inputRef}
                language={qr.language}
                label={qr.language.locale.word.form.phoneNumber}
                isRequired={false}
                detectedCountry={detectedCountry}
                isCountryDetecting={isCountryDetecting}
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
                language={qr.language}
              />
            )}
          />
        </Stack>
      </FormCard>
    </FormButton>
  )
}
