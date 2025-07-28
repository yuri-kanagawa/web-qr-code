import { FC } from 'react'
import { Controller, useFormState, useWatch } from 'react-hook-form'
import { useEmailQRCodeForm } from '../../hooks'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { EmailTextField } from '@/ui/fragments/textField'
import { SubjectTextField } from '@/ui/fragments/textField'
import { BodyTextField } from '@/ui/fragments/textField'
import { formatEmail } from '../../hooks/utils'
import { usePathname } from 'next/navigation'

// パスから言語を抽出する関数
const getCurrentLanguage = (pathname: string): string => {
  const segments = pathname.split('/')
  const firstSegment = segments[1]

  if (firstSegment === 'ja' || firstSegment === 'fr') {
    return firstSegment
  }
  return 'en'
}

type Props = {}

export const EmailForm: FC<Props> = () => {
  const pathname = usePathname()
  const currentLanguage = getCurrentLanguage(pathname)

  const {
    control,
    ref,
    onDownload,
    onConfirm,
    watch,
    formState: { isValid }
  } = useEmailQRCodeForm({
    language: currentLanguage
  })

  return (
    <>
      <FormButton
        onConfirm={onConfirm}
        onDownload={onDownload}
        value={formatEmail(watch())}
        isValid={isValid}
        ref={ref}
      >
        <Controller
          control={control}
          name="email"
          render={({
            field: { value, onChange, ref: inputRef },
            formState: { isValid },
            fieldState: { error }
          }) => (
            <EmailTextField
              value={value}
              onChange={onChange}
              inputRef={inputRef}
              error={!!error} // エラー状態
              helperText={error?.message} // エラーメッセージ
            />
          )}
        />
        <Controller
          control={control}
          name="subject"
          render={({
            field: { value, onChange, ref: inputRef },
            formState: { isValid },
            fieldState: { error }
          }) => (
            <SubjectTextField
              value={value}
              onChange={onChange}
              inputRef={inputRef}
              error={!!error} // エラー状態
              helperText={error?.message} // エラーメッセージ
            />
          )}
        />
        <Controller
          control={control}
          name="body"
          render={({
            field: { value, onChange, ref: inputRef },
            formState: { isValid },
            fieldState: { error }
          }) => <BodyTextField value={value} onChange={onChange} />}
        />
      </FormButton>
    </>
  )
}
