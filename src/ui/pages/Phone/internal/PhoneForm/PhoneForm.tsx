import React, { FC } from 'react'
import { usePhoneQrCodeForm } from '@/ui/pages/Phone/hooks/usePhoneQrCodeForm'
import { Controller } from 'react-hook-form'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { PhoneTextField, UrlTextField } from '@/ui/cores/textField'
import { formatPhoneNumberForTel } from '@/utils/qr'

type Props = {}

export const PhoneForm: FC<Props> = ({}) => {
  const { control, ref, file, setFile, onConfirm, onDownload } =
    usePhoneQrCodeForm()
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
          setFile={setFile}
          file={file}
          onConfirm={onConfirm}
          onDownload={onDownload}
          value={formatPhoneNumberForTel(value)}
          isValid={isValid}
          ref={ref}
        >
          <PhoneTextField
            cellPhone={{
              value,
              onChange,
              error: !!error,
              message: error?.message
            }}
          />
        </FormButton>
      )}
    />
  )
}
