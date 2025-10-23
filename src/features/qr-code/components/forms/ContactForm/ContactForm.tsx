'use client'
import {
  EmailTextField,
  NameTextField,
  OrganizationForm,
  UrlTextField
} from '@/ui/fragments/textField'
import { CellPhoneTextField } from '@/ui/fragments/textField/PhoneTextField'
import { FC } from 'react'

import { FormButton } from '@/features/qr-code'
import { Stack, TextField } from '@/ui/cores'
import { FormSection } from '@/ui/fragments/box'
import { FormCard } from '@/ui/fragments/form'
import { Controller } from 'react-hook-form'

import { QrCode } from '@/domains'
import { useContactQrCodeForm } from './hooks'

interface Props {
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const ContactForm: FC<Props> = ({ qr, onChange }) => {
  const locale = qr.language.locale
  const {
    control,

    watch,
    formState: { isValid }
  } = useContactQrCodeForm({
    qr
  })

  return (
    <FormButton isValid={isValid} qr={qr} onChange={onChange}>
      <FormCard cardProps={{ sx: { p: 2 } }}>
        <Stack spacing={3}>
          {/* 基本情報 */}
          <FormSection
            label={qr.language.isEnglish ? 'Basic Information' : '基本情報'}
          >
            <Stack spacing={2}>
              <Controller
                control={control}
                name="firstName"
                render={({
                  field: firstNameField,
                  formState: { isValid },
                  fieldState: { error }
                }) => (
                  <Controller
                    control={control}
                    name="lastName"
                    render={({
                      field: lastNameField,
                      formState: { isValid },
                      fieldState: { error }
                    }) => (
                      <Controller
                        control={control}
                        name="middleName"
                        render={({
                          field: middleNameField,
                          formState: { isValid },
                          fieldState: { error }
                        }) => (
                          <NameTextField
                            firstName={{ ...firstNameField }}
                            lastName={{ ...lastNameField }}
                            middleName={{ ...middleNameField }}
                            language={qr.language}
                          />
                        )}
                      />
                    )}
                  />
                )}
              />
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
                    language={qr.language}
                    inputRef={inputRef}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
              <Controller
                control={control}
                name="mobilePhone"
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
                    language={qr.language}
                    label={locale.word.form.mobilePhone}
                    isRequired={false}
                  />
                )}
              />
              <Controller
                control={control}
                name="homePhone"
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
                    language={qr.language}
                    label={locale.word.form.homePhone}
                    isRequired={false}
                  />
                )}
              />
              <Controller
                control={control}
                name="homeAddress"
                render={({
                  field: { value, onChange, ref: inputRef },
                  formState: { isValid },
                  fieldState: { error }
                }) => (
                  <TextField
                    label={locale.word.form.address}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    inputRef={inputRef}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                    multiline
                    rows={3}
                  />
                )}
              />
              <Controller
                control={control}
                name="homeUrl"
                render={({
                  field: { value, onChange, ref: inputRef },
                  formState: { isValid },
                  fieldState: { error }
                }) => (
                  <UrlTextField
                    value={value}
                    onChange={onChange}
                    inputRef={inputRef}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
            </Stack>
          </FormSection>

          {/* ビジネス情報 */}
          <FormSection
            label={
              qr.language.isEnglish ? 'Business Information' : 'ビジネス情報'
            }
          >
            <Stack spacing={2}>
              <Controller
                control={control}
                name="organization"
                render={({
                  field: { value, onChange, ref: inputRef },
                  formState: { isValid },
                  fieldState: { error }
                }) => (
                  <OrganizationForm
                    value={value}
                    onChange={onChange}
                    language={qr.language}
                    inputRef={inputRef}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
              <Controller
                control={control}
                name="post"
                render={({
                  field: { value, onChange, ref: inputRef },
                  formState: { isValid },
                  fieldState: { error }
                }) => (
                  <TextField
                    label={locale.word.form.post}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    inputRef={inputRef}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
              <Controller
                control={control}
                name="workMobile"
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
                    language={qr.language}
                    label={locale.word.form.workMobile}
                    isRequired={false}
                  />
                )}
              />
              <Controller
                control={control}
                name="workPhone"
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
                    language={qr.language}
                    label={locale.word.form.workPhone}
                    isRequired={false}
                  />
                )}
              />
              <Controller
                control={control}
                name="workAddress"
                render={({
                  field: { value, onChange, ref: inputRef },
                  formState: { isValid },
                  fieldState: { error }
                }) => (
                  <TextField
                    label={locale.word.form.address}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    inputRef={inputRef}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                    multiline
                    rows={3}
                  />
                )}
              />
              <Controller
                control={control}
                name="workUrl"
                render={({
                  field: { value, onChange, ref: inputRef },
                  formState: { isValid },
                  fieldState: { error }
                }) => (
                  <UrlTextField
                    value={value}
                    onChange={onChange}
                    inputRef={inputRef}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
            </Stack>
          </FormSection>
        </Stack>
      </FormCard>
    </FormButton>
  )
}
