import { FC } from 'react'
import { Controller, useFormState, useWatch } from 'react-hook-form'
import { useEmailQRCodeForm } from './hooks'

import { EmailTextField } from '@/ui/fragments/textField'
import { SubjectTextField } from '@/ui/fragments/textField'
import { BodyTextField } from '@/ui/fragments/textField'
import { formatEmail } from './hooks/utils'
import { FormButton, FormCard } from '@/ui/fragments'
import { Language } from '@/domains/valueObjects/language'

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
      ref={ref}
    >
      <Controller
        control={control}
        name="email"
        render={({
          field: { value, onChange, ref: inputRef },
          formState: { isValid },
          fieldState: { error }
        }) => (
          <FormCard title="Email Address" variant="required">
            <EmailTextField
              value={value}
              onChange={(value) => {
                onChange(value)
                if (onEmailChange) {
                  onEmailChange(value)
                }
              }}
              inputRef={inputRef}
              error={!!error}
              helperText={error?.message}
            />
          </FormCard>
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
          <FormCard title="Subject" variant="optional">
            <SubjectTextField
              value={value}
              onChange={(value) => {
                onChange(value)
                if (onSubjectChange) {
                  onSubjectChange(value)
                }
              }}
              inputRef={inputRef}
              error={!!error}
              helperText={error?.message}
            />
          </FormCard>
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
          <FormCard title="Message Body" variant="optional">
            <BodyTextField
              value={value}
              onChange={(value) => {
                onChange(value)
                if (onBodyChange) {
                  onBodyChange(value)
                }
              }}
              inputRef={inputRef}
              error={!!error}
              helperText={error?.message}
            />
          </FormCard>
        )}
      />
    </FormButton>
  )
}
