import { Language } from '@/domains/valueObjects/language'
import { FormButton, FormCard } from '@/ui/fragments/form'
import { BodyTextField } from '@/ui/fragments/textField'
import { CellPhoneTextField } from '@/ui/fragments/textField/PhoneTextField'
import { Stack } from '@mui/material'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { toSmsSchema } from './hooks'
import { useSmsQrCodeForm } from './hooks/useSmsQrCodeForm'

interface Props {
  language: Language
  phoneNumber: string
  body: string
}

export const SmsForm: FC<Props> = (props) => {
  const {
    control,
    ref,
    onConfirm,
    onDownload,
    watch,
    formState: { isValid }
  } = useSmsQrCodeForm(props)

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      value={toSmsSchema(watch())}
      isValid={isValid}
      language={props.language}
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
                onChange={onChange}
                error={!!error}
                helperText={error?.message}
                inputRef={inputRef}
                language={props.language}
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
                onChange={onChange}
                inputRef={inputRef}
                helperText={error?.message}
                error={!!error}
                language={props.language}
              />
            )}
          />
        </Stack>
      </FormCard>
    </FormButton>
  )
}
