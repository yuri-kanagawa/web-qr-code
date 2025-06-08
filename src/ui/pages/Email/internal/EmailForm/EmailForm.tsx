import React, { FC } from 'react'
import { useEmailQRCodeForm } from '@/ui/pages/Email/hooks'
import { Controller, useFormState, useWatch } from 'react-hook-form'
import { FormButton } from '@/ui/fragments/form/FormButton'

import {
  BodyTextField,
  EmailTextField,
  PhoneTextField,
  SubjectTextField
} from '@/ui/fragments/textField'
import { formatEmail } from '../../hooks/utils'

type Props = {}

export const EmailForm: FC<Props> = () => {
  const { control, ref, onDownload, onConfirm } = useEmailQRCodeForm()
  const { isValid: emailIsValid } = useFormState({ control, name: 'email' })
  const {} = useFormState({ control, name: 'subject' })
  const {} = useFormState({ control, name: 'body' })
  const email = useWatch({ control, name: 'email' })
  const subject = useWatch({ control, name: 'subject' })
  const body = useWatch({ control, name: 'body' })
  return (
    <>
      <FormButton
        onConfirm={onConfirm}
        onDownload={onDownload}
        value={formatEmail({ email, subject, body })}
        isValid={emailIsValid}
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
            <EmailTextField
              value={value}
              onChange={onChange}
              inputRef={inputRef}
              error={!!error} // エラー状態
              helperText={error?.message} // エラーメッセージ
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
              value={value}
              onChange={onChange}
              inputRef={inputRef}
              error={!!error} // エラー状態
              helperText={error?.message} // エラーメッセージ
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
          }) => <BodyTextField value={value} onChange={onChange} />}
        />
      </FormButton>
    </>
  )
}
