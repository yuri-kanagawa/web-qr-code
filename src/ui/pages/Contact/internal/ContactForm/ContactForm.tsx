import { FC } from 'react'
import {
  EmailTextField,
  NameTextField,
  OrganizationForm,
  PhoneTextField,
  UrlTextField
} from '../../../../fragments/textField'
import { useQrCode } from '@/hooks'
import { useContactQrCodeForm } from '../../hooks'
import { Controller } from 'react-hook-form'
import { FormButton } from '@/ui/fragments/form/FormButton'

export const ContactForm: FC<Props> = ({}) => {
  const { control, onConfirm, onDownload, ref } = useContactQrCodeForm()
  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      value={'Download QR Code'}
      isValid={true}
      ref={ref}
    >
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
        name="email"
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
    </FormButton>
  )
}
