'use client'
import { FC } from 'react'
import {
  EmailTextField,
  NameTextField,
  OrganizationForm,
  PhoneTextField,
  UrlTextField
} from '@/ui/fragments/textField'

import { useContactQrCodeForm, convertContact } from './hooks'
import { Controller } from 'react-hook-form'
import { FormButton, FormCard } from '@/ui/fragments/form'
import { Language } from '@/domains/valueObjects/language'

interface Props {
  language: Language
  firstName: string
  lastName: string
  middleName: string
  email: string
  organization: string
  url: string
  phoneNumber: string
  post: string
  businessCellularTelephone: string
  privateCellularTelephone: string
  address: string
}

export const ContactForm: FC<Props> = ({
  language,
  firstName,
  lastName,
  middleName,
  email,
  organization,
  url,
  phoneNumber,
  post,
  businessCellularTelephone,
  privateCellularTelephone,
  address
}) => {
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
    organization,
    url,
    phoneNumber,
    post,
    businessCellularTelephone,
    privateCellularTelephone,
    address
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
      <FormCard>
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
              inputRef={inputRef}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
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
              inputRef={inputRef}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="url"
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
            />
          )}
        />
      </FormCard>
    </FormButton>
  )
}
