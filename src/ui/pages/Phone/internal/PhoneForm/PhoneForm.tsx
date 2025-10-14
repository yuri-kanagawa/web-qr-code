'use client'
import { Language } from '@/domains/valueObjects/language'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { PhoneTextField } from '@/ui/fragments/textField'
import { usePhoneQrCodeForm } from '@/ui/pages/phone/hooks/usePhoneQrCodeForm'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { toTelScheme } from '../../hooks/utils'

interface Props {
  language: Language
}

export const PhoneForm: FC<Props> = ({}) => {
  const { control, ref, onConfirm, onDownload, watch } = usePhoneQrCodeForm()
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
          isValid={isValid}
          ref={ref}
        >
          <PhoneTextField
            cellPhone={{
              value,
              onChange,
              error: !!error,
              helperText: error?.message,
              inputRef
            }}
          />
        </FormButton>
      )}
    />
  )
}
