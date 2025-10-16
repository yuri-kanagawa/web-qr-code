import { Language } from '@/domains'
import { Stack } from '@/ui/cores'
import { FormButton, FormCard } from '@/ui/fragments'
import {
  BodyTextField,
  EmailTextField,
  SubjectTextField
} from '@/ui/fragments/textField'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { useEmailQRCodeForm } from './hooks'
import { formatEmail } from './hooks/utils'

interface Props {
  language: Language
  email?: string
  subject?: string
  body?: string
  onEmailChange?: (email: string) => void
  onSubjectChange?: (subject: string) => void
  onBodyChange?: (body: string) => void
}

export const EmailForm: FC<Props> = ({
  language,
  email,
  subject,
  body,
  onEmailChange,
  onSubjectChange,
  onBodyChange
}) => {
  const {
    control,
    ref,
    onDownload,
    onConfirm,
    watch,
    formState: { isValid }
  } = useEmailQRCodeForm({
    language,
    email,
    subject,
    body
  })

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      value={formatEmail(watch())}
      isValid={isValid}
      language={language}
      ref={ref}
    >
      <FormCard cardProps={{ sx: { p: 2 } }}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({
              field: { value, onChange, ref: inputRef },
              formState: { isValid },
              fieldState: { error }
            }) => (
              <EmailTextField
                value={value.value}
                onChange={(newValue) => {
                  onChange(newValue)
                  if (onEmailChange) {
                    onEmailChange(newValue)
                  }
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
              field: { value, onChange, ref: inputRef },
              formState: { isValid },
              fieldState: { error }
            }) => (
              <SubjectTextField
                value={value.value}
                onChange={(newValue) => {
                  onChange(newValue)
                  if (onSubjectChange) {
                    onSubjectChange(newValue)
                  }
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
              field: { value, onChange, ref: inputRef },
              formState: { isValid },
              fieldState: { error }
            }) => (
              <BodyTextField
                value={value.value}
                onChange={(newValue) => {
                  onChange(newValue)
                  if (onBodyChange) {
                    onBodyChange(newValue)
                  }
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
