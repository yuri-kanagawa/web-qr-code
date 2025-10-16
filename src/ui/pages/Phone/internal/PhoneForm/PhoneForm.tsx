import { Language } from '@/domains/valueObjects/language'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { PhoneTextField } from '@/ui/fragments/textField'
import { usePhoneQrCodeForm } from '@/ui/pages/phone/hooks/usePhoneQrCodeForm'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { toTelScheme } from '../../hooks/utils'

interface Props {
  language: Language
}

export const PhoneForm: FC<Props> = ({ language }) => {
  const { control, ref, onConfirm, onDownload, watch } = usePhoneQrCodeForm()
  return (
    <Controller
      control={control}
      name="phoneNumber"
      render={({
        field: { value, onChange, ref: inputRef },
        formState: { isValid },
        fieldState: { error }
      }) => (
        <FormButton
          onConfirm={onConfirm}
          onDownload={onDownload}
          value={toTelScheme(watch())}
          language={language}
          isValid={isValid}
          ref={ref}
        >
          <FormCard cardProps={{ sx: { p: 2 } }}>
            <PhoneTextField
              cellPhone={{
                value,
                onChange,
                error: !!error,
                helperText: error?.message,
                inputRef
              }}
              language={language}
            />
          </FormCard>
        </FormButton>
      )}
    />
  )
}
