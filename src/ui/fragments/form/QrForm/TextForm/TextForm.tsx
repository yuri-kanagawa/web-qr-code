import React, { FC } from 'react'
import { useTextQrCodeForm } from './hooks'
import { Controller } from 'react-hook-form'
import { toTelScheme } from '@/ui/pages/Phone/hooks/utils'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { TextTextField } from '@/ui/fragments/textField/TextTextField'
import { fromTextScheme, toTextSchema } from './hooks'
interface Props {
  language?: string
  text?: string
}

export const TextForm: FC<Props> = ({ language = 'en', text = '' }) => {
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
          ref={ref}
        >
          <TextTextField value={value} onChange={onChange} />
        </FormButton>
      )}
    />
  )
}
