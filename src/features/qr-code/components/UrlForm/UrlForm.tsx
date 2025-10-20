import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { UrlTextField } from '@/ui/fragments/textField'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { QrFormProps } from '../../types'
import { useUrlQRCodeForm } from './hooks'

export const UrlForm: FC<QrFormProps> = ({ language, qr, onChange }) => {
  const {
    control,
    formState: { isValid }
  } = useUrlQRCodeForm({
    language,
    qr
  })

  return (
    <FormButton
      isValid={isValid}
      qr={qr}
      language={language}
      onChange={onChange}
    >
      <Controller
        control={control}
        name="url"
        render={({
          field: { value, onChange: fieldOnChange, ref: inputRef },
          fieldState
        }) => (
          <FormCard cardProps={{ sx: { p: 2 } }}>
            <UrlTextField
              isRequired
              inputRef={inputRef}
              value={value}
              onChange={(event) => {
                const newValue = event.target.value
                fieldOnChange(newValue)
                const newQr = qr.changeUrl(newValue)
                onChange(newQr)
              }}
              error={!!fieldState.error}
              fullWidth
              helperText={fieldState.error?.message}
            />
          </FormCard>
        )}
      />
    </FormButton>
  )
}
