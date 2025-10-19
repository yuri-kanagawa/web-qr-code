import { Language, QrCode } from '@/domains'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { TextTextField } from '@/ui/fragments/textField/TextTextField'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { toTextSchema, useTextQrCodeForm } from './hooks'

interface Props {
  language: Language
  qr: QrCode
}

export const TextForm: FC<Props> = ({ language, qr }: Props) => {
  const { control, onConfirm, onDownload, watch } = useTextQrCodeForm({
    text: qr.value.text || '',
    language
  })

  return (
    <Controller
      control={control}
      name="text"
      render={({
        field: { value, onChange, ref: inputRef },
        formState: { isValid },
        fieldState: { error }
      }) => (
        <FormButton
          onConfirm={onConfirm}
          onDownload={onDownload}
          value={toTextSchema(watch())}
          isValid={isValid}
          language={language}
          settings={qr}
          onChange={() => {}}
        >
          <FormCard cardProps={{ sx: { p: 2 } }}>
            <TextTextField
              value={value}
              onChange={onChange}
              language={language}
              isRequired={true}
            />
          </FormCard>
        </FormButton>
      )}
    />
  )
}
