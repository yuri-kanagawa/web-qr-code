import React, { FC } from 'react'
import { useSmsQrCodeForm } from '@/ui/pages/Text/hooks'
import { Controller } from 'react-hook-form'
import { formatPhoneNumberForTel } from '@/ui/pages/Phone/hooks/utils'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { TextTextField } from '@/ui/fragments/textField/TextTextField'
type Props = {}

export const TextForm: FC<Props> = () => {
  const { control, ref, onConfirm, onDownload } = useSmsQrCodeForm()
  return (
    <>
      <Controller
        control={control}
        name="text"
        render={({
          field: { value, onChange, ref: inputRef },
          formState: { isValid },
          fieldState: { error }
        }) => (
          <FormButton
            onConfirm={onConfirm}
            onDownload={onDownload}
            value={formatPhoneNumberForTel(value)}
            isValid={isValid}
            ref={ref}
          >
            <TextTextField
              value={value}
              onChange={onChange}
              inputRef={inputRef}
              error={!!error}
              helperText={error?.message}
            />
          </FormButton>
        )}
      />
    </>
  )
}
