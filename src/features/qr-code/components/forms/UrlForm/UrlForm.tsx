import { FormButton } from '@/features/qr-code'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { UrlTextField } from '@/ui/fragments/textField'
import { FC } from 'react'
import { Controller } from 'react-hook-form'

import { QrCode } from '@/domains'
import { useUrlQRCodeForm } from './hooks'

interface Props {
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const UrlForm: FC<Props> = ({ qr, onChange }) => {
  const {
    control,
    formState: { isValid }
  } = useUrlQRCodeForm({
    qr
  })

  return (
    <FormButton isValid={isValid} qr={qr} onChange={onChange}>
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
