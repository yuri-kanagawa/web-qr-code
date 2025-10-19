'use client'
import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { CellPhoneTextField } from '@/ui/fragments/textField/PhoneTextField'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { usePhoneQrCodeForm } from './hooks/usePhoneQrCodeForm'
import { toTelScheme } from './hooks/utils'

interface Props {
  language: Language
  qr: QrCode
}

export const PhoneForm: FC<Props> = ({ language, qr }) => {
  const { control, onConfirm, onDownload, watch } = usePhoneQrCodeForm({
    phoneNumber: qr.value.phoneNumber || '',
    language
  })

  return (
    <Controller
      control={control}
      name="phoneNumber"
      render={({
        field: { value, onChange, ref: inputRef },
        formState: { isValid },
        fieldState: { error }
      }) => (
        <FormButton
          onConfirm={onConfirm}
          onDownload={onDownload}
          value={toTelScheme(watch())}
          language={language}
          isValid={isValid}
          settings={qr}
          onChange={() => {}}
        >
          <FormCard cardProps={{ sx: { p: 2 } }}>
            <CellPhoneTextField
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
              inputRef={inputRef}
              language={language}
            />
          </FormCard>
        </FormButton>
      )}
    />
  )
}
