import React, { FC } from 'react'
import { useSmsQrCodeForm } from '@/ui/pages/text/hooks'
import { Controller } from 'react-hook-form'
import { toTelScheme } from '@/ui/pages/phone/hooks/utils'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { TextTextField } from '@/ui/fragments/textField/TextTextField'
import { fromTextScheme, toTextSchema } from '../hooks/utils'
type Props = {}

export const TextForm: FC<Props> = ({}) => {
  const { control, ref, onConfirm, onDownload, watch } = useSmsQrCodeForm()
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
