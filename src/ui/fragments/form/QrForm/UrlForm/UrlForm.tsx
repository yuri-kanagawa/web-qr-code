import { Language, QrCode } from '@/domains'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { useUrlQRCodeForm } from '@/ui/fragments/form/QrForm/UrlForm/hooks'
import { UrlTextField } from '@/ui/fragments/textField'
import { FC } from 'react'
import { Controller } from 'react-hook-form'

type Props = {
  language: Language
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const UrlForm: FC<Props> = ({ language, qr, onChange }) => {
  const {
    control,
    onConfirm,
    onDownload,
    formState: { isValid }
  } = useUrlQRCodeForm({
    language,
    url: qr.value.url || ''
  })

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
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
