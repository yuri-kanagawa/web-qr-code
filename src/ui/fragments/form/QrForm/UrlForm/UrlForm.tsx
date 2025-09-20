'use client'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { useUrlQRCodeForm } from '@/ui/fragments/form/QrForm/UrlForm/hooks'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { UrlTextField } from '@/ui/fragments/textField'
import { usePathname } from 'next/navigation'
import { FormButton } from '@/ui/fragments/form/FormButton'

type Props = {
  language: string
  url: string
}

export const UrlForm: FC<Props> = ({ language, url }) => {
  const {
    control,
    onConfirm,
    onDownload,
    ref,
    watch,
    formState: { isValid }
  } = useUrlQRCodeForm({
    language,
    url
  })

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      value={watch('url')}
      isValid={isValid}
      ref={ref}
    >
      <Controller
        control={control}
        name="url"
        render={({
          field: { value, onChange, ref: inputRef },
          formState: { isValid },
          fieldState
        }) => (
          <FormCard title="URL" variant="required">
            <UrlTextField
              isRequired
              inputRef={inputRef}
              value={value}
              onChange={onChange}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          </FormCard>
        )}
      />
    </FormButton>
  )
}
