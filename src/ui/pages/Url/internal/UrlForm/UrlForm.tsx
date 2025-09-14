'use client'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { useUrlQRCodeForm } from '@/ui/pages/url/internal/UrlForm/hooks'
import { FormCard } from '@/ui/fragments/form'
import { UrlTextField } from '@/ui/fragments/textField'
import { usePathname } from 'next/navigation'
import { FormButton } from '@/ui/fragments/form/FormButton'

// パスから言語を抽出する関数
const getCurrentLanguage = (pathname: string): string => {
  const segments = pathname.split('/')
  const firstSegment = segments[1]

  if (firstSegment === 'ja' || firstSegment === 'fr') {
    return firstSegment
  }
  return 'en'
}

type Props = {
  language: string
}

export const UrlForm: FC<Props> = ({ language }) => {
  const {
    control,
    onConfirm,
    onDownload,
    ref,
    watch,
    formState: { isValid }
  } = useUrlQRCodeForm({
    language
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
              onChange={(e) => {
                onChange(e.currentTarget.value)
              }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          </FormCard>
        )}
      />
    </FormButton>
  )
}
