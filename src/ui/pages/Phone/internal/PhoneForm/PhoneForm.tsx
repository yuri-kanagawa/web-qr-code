'use client'
import { QrCodeSettings } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { CellPhoneTextField } from '@/ui/fragments/textField/PhoneTextField'
import { usePhoneQrCodeForm } from '@/ui/pages/Phone/hooks/usePhoneQrCodeForm'
import { FC, useState } from 'react'
import { Controller } from 'react-hook-form'
import { toTelScheme } from '../../hooks/utils'

interface Props {
  language: Language
}

export const PhoneForm: FC<Props> = ({ language }) => {
  const { control, ref, onConfirm, onDownload, watch } = usePhoneQrCodeForm()
  const [settings, setSettings] = useState(() => QrCodeSettings.default())
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
          settings={settings}
          onChange={setSettings}
          ref={ref}
        >
          <FormCard cardProps={{ sx: { p: 2 } }}>
            <CellPhoneTextField
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
              inputRef={inputRef}
              language={language}
            />
          </FormCard>
        </FormButton>
      )}
    />
  )
}
