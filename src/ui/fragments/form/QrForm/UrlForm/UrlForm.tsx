import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { useUrlQRCodeForm } from '@/ui/fragments/form/QrForm/UrlForm/hooks'
import { UrlTextField } from '@/ui/fragments/textField'
import { FC } from 'react'
import { Controller } from 'react-hook-form'

type Props = {
  language: Language
  qr: QrCodeCode
}

export const UrlForm: FC<Props> = ({ language, qr }) => {
  const {
    control,
    onConfirm,
    onDownload,
    ref,
    watch,
    formState: { isValid }
  } = useUrlQRCodeForm({
    language,
    url: qr.value.url || ''
  })
  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      value={watch('url')}
      isValid={isValid}
      settings={qr}
      onChange={() => {}}
      language={language}
      ref={ref}
    >
      <Controller
        control={control}
        name="url"
        render={({ field: { value, onChange, ref: inputRef }, fieldState }) => (
          <FormCard cardProps={{ sx: { p: 2 } }}>
            <UrlTextField
              isRequired
              inputRef={inputRef}
              value={value}
              onChange={onChange}
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
