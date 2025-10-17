'use client'
import {
  EmailTextField,
  NameTextField,
  OrganizationForm,
  UrlTextField
} from '@/ui/fragments/textField'
import { CellPhoneTextField } from '@/ui/fragments/textField/PhoneTextField'
import { FC } from 'react'

import { Language } from '@/domains/valueObjects/language'
import { Stack, TextField } from '@/ui/cores'
import { FormSection } from '@/ui/fragments/box'
import { FormButton, FormCard } from '@/ui/fragments/form'
import { Controller } from 'react-hook-form'
import { convertContact, useContactQrCodeForm } from './hooks'

interface Props {
  language: Language
  firstName: string
  lastName: string
  middleName: string
  email: string
  phoneNumber: string
  homeAddress: string
  homeUrl: string
  organization: string
  post: string
  workPhone: string
  workAddress: string
  workUrl: string
}

export const ContactForm: FC<Props> = ({
  language,
  firstName,
  lastName,
  middleName,
  email,
  phoneNumber,
  homeAddress,
  homeUrl,
  organization,
  post,
  workPhone,
  workAddress,
  workUrl
}) => {
  const locale = language.locale
  const {
    control,
    onConfirm,
    onDownload,
    ref,
    watch,
    formState: { isValid }
  } = useContactQrCodeForm({
    language,
    firstName,
    lastName,
    middleName,
    email,
    phoneNumber,
    homeAddress,
    homeUrl,
    organization,
    post,
    workPhone,
    workAddress,
    workUrl
  })

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      value={convertContact(watch())}
      language={language}
      isValid={isValid}
      ref={ref}
    >
      <FormCard cardProps={{ sx: { p: 2 } }}>
        <Stack spacing={3}>
          {/* 基本情報 */}
          <FormSection
            label={language.isEnglish ? 'Basic Information' : '基本情報'}
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
                            language={language}
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
                    language={language}
                    inputRef={inputRef}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
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
                    language={language}
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
            label={language.isEnglish ? 'Business Information' : 'ビジネス情報'}
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
                    language={language}
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
                    language={language}
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
