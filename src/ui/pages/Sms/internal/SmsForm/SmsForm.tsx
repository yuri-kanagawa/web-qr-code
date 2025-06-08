import { useQrCode } from '@/hooks'
import { FC } from 'react'
import { useSmsQrCodeForm } from '../../hooks/useSmsQrCodeForm'
import { Controller, useWatch } from 'react-hook-form'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { formatSms } from '../../hooks'
import { PhoneTextField } from '@/ui/fragments/textField/PhoneTextField'
import { BodyTextField } from '@/ui/fragments/textField'
import { watch } from 'fs'

type Props = {}

export const SmsForm: FC<Props> = () => {
  const {
    control,
    ref,
    onConfirm,
    onDownload,
    watch,
    formState: { isValid }
  } = useSmsQrCodeForm()

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      value={formatSms(watch())}
      isValid={isValid}
      ref={ref}
    >
      <Controller
        control={control}
        name="phoneNumber"
        render={({
          field: { value, onChange, ref: inputRef },
          formState: { isValid },
          fieldState: { error }
        }) => (
          <PhoneTextField
            cellPhone={{
              value,
              onChange,
              error: !!error,
              helperText: error?.message,
              inputRef
            }}
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
            onChange={onChange}
            inputRef={inputRef}
            helperText={error?.message}
            error={!!error}
          />
        )}
      />
    </FormButton>
  )
}
