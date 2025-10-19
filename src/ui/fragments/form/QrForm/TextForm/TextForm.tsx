import { Language, QrCodeSettings } from '@/domains'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { TextTextField } from '@/ui/fragments/textField/TextTextField'
import { FC, useState } from 'react'
import { Controller } from 'react-hook-form'
import { toTextSchema, useTextQrCodeForm } from './hooks'

interface Props {
  language: Language
  text?: string
}

export const TextForm: FC<Props> = ({ language, text = '' }: Props) => {
  const [settings, setSettings] = useState<QrCodeSettings>(QrCodeSettings.default())
  
  const { control, ref, onConfirm, onDownload, watch } = useTextQrCodeForm({
    text,
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
          settings={settings}
          onChange={setSettings}
          ref={ref}
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
