'use client'
import React, { FC } from 'react'
import { usePhoneQrCodeForm } from '@/ui/pages/Phone/hooks/usePhoneQrCodeForm'
import { Controller } from 'react-hook-form'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { toTelScheme } from '../../hooks/utils'
import { PhoneTextField } from '@/ui/fragments/textField'

interface Props {
  language: string
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
