'use client'
import { Country, QrCode } from '@/domains'
import { PhoneTextField } from '@/features/country'
import { FormButton } from '@/features/qr-code'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { FC, useState } from 'react'
import { Controller } from 'react-hook-form'
import { usePhoneQrCodeForm } from './hooks/usePhoneQrCodeForm'

interface Props {
  qr: QrCode
  onChange: (qr: QrCode) => void
  detectedCountry?: Country | null
  isCountryDetecting?: boolean
}

export const PhoneForm: FC<Props> = ({
  qr,
  onChange,
  detectedCountry,
  isCountryDetecting
}) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(qr)
  const { control, watch } = usePhoneQrCodeForm({ qr })

  return (
    <Controller
      control={control}
      name="phoneNumber"
      render={({
        field: { value, onChange: fieldOnChange, ref: inputRef },
        formState: { isValid },
        fieldState: { error }
      }) => (
        <FormButton
          isValid={isValid}
          qr={currentQr}
          onChange={(newQr) => {
            setCurrentQr(newQr)
            onChange(newQr)
          }}
        >
          <FormCard cardProps={{ sx: { p: 2 } }}>
            <PhoneTextField
              value={value}
              onChange={(newValue) => {
                fieldOnChange(newValue) // react-hook-formの状態を更新
                const newQr = qr.changePhoneNumber(newValue) // QrCodeの状態を更新
                setCurrentQr(newQr) // ローカル状態を更新
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
          </FormCard>
        </FormButton>
      )}
    />
  )
}
