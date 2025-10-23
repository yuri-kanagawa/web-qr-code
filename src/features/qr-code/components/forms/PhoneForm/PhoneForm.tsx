'use client'
import { QrCode } from '@/domains'
import { FormButton } from '@/features/qr-code'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { CellPhoneTextField } from '@/ui/fragments/textField/PhoneTextField'
import { FC, useState } from 'react'
import { Controller } from 'react-hook-form'
import { QrFormProps } from '../../types'
import { usePhoneQrCodeForm } from './hooks/usePhoneQrCodeForm'

export const PhoneForm: FC<QrFormProps> = ({ language, qr, onChange }) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(qr)
  const { control, watch } = usePhoneQrCodeForm({ language, qr })

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
          language={language}
          isValid={isValid}
          qr={currentQr}
          onChange={(newQr) => {
            setCurrentQr(newQr)
            onChange(newQr)
          }}
        >
          <FormCard cardProps={{ sx: { p: 2 } }}>
            <CellPhoneTextField
              value={value}
              onChange={(newValue) => {
                console.log('PhoneForm onChange:', newValue)
                fieldOnChange(newValue) // react-hook-formの状態を更新
                const newQr = qr.changePhoneNumber(newValue) // QrCodeの状態を更新
                console.log('PhoneForm newQr:', newQr.qrValue.value)
                setCurrentQr(newQr) // ローカル状態を更新
                onChange(newQr) // 親コンポーネントに新しいQrCodeを渡す
              }}
              error={!!error}
              helperText={error?.message}
              inputRef={inputRef}
              language={language}
              label={language.locale.word.form.phoneNumber}
              isRequired={false}
            />
          </FormCard>
        </FormButton>
      )}
    />
  )
}
