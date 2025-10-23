import { FormButton } from '@/features/qr-code'
import { Stack } from '@/ui/cores'
import { FormCard } from '@/ui/fragments'
import {
  BodyTextField,
  EmailTextField,
  SubjectTextField
} from '@/ui/fragments/textField'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { QrFormProps } from '../../types'
import { useEmailQRCodeForm } from './hooks'

export const EmailForm: FC<QrFormProps> = ({ language, qr, onChange }) => {
  const {
    control,
    onDownload,
    onConfirm,
    watch,
    formState: { isValid }
  } = useEmailQRCodeForm({
    language,
    qr
  })

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      isValid={isValid}
      language={language}
      qr={qr}
      onChange={onChange}
    >
      <FormCard cardProps={{ sx: { p: 2 } }}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({
              field: { value, onChange: fieldOnChange, ref: inputRef },
              formState: { isValid },
              fieldState: { error }
            }) => (
              <EmailTextField
                value={value}
                onChange={(newValue) => {
                  fieldOnChange(newValue) // react-hook-formの状態を更新
                  const newQr = qr.changeEmail(newValue) // QrCodeの状態を更新
                  onChange(newQr) // 親コンポーネントに新しいQrCodeを渡す
                }}
                inputRef={inputRef}
                error={!!error}
                helperText={error?.message}
                language={language}
              />
            )}
          />
          <Controller
            control={control}
            name="subject"
            render={({
              field: { value, onChange: fieldOnChange, ref: inputRef },
              formState: { isValid },
              fieldState: { error }
            }) => (
              <SubjectTextField
                value={value}
                onChange={(newValue) => {
                  fieldOnChange(newValue) // react-hook-formの状態を更新
                  const newQr = qr.changeSubject(newValue) // QrCodeの状態を更新
                  onChange(newQr) // 親コンポーネントに新しいQrCodeを渡す
                }}
                inputRef={inputRef}
                error={!!error}
                helperText={error?.message}
                language={language}
              />
            )}
          />
          <Controller
            control={control}
            name="body"
            render={({
              field: { value, onChange: fieldOnChange, ref: inputRef },
              formState: { isValid },
              fieldState: { error }
            }) => (
              <BodyTextField
                value={value}
                onChange={(newValue) => {
                  fieldOnChange(newValue) // react-hook-formの状態を更新
                  const newQr = qr.changeBody(newValue) // QrCodeの状態を更新
                  onChange(newQr) // 親コンポーネントに新しいQrCodeを渡す
                }}
                inputRef={inputRef}
                error={!!error}
                helperText={error?.message}
                language={language}
              />
            )}
          />
        </Stack>
      </FormCard>
    </FormButton>
  )
}
