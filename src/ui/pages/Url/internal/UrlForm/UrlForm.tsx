import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { useUrlQRCodeForm } from '../../hooks'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { UrlTextField } from '@/ui/fragments/textField'
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

export const UrlForm: FC<Props> = ({}) => {
  const pathname = usePathname()
  const currentLanguage = getCurrentLanguage(pathname)

  const { control, onConfirm, onDownload, ref } = useUrlQRCodeForm({
    language: currentLanguage
  })

  return (
    <Controller
      control={control}
      name="url"
      render={({
        field: { value, onChange, ref: inputRef },
        formState: { isValid },
        fieldState
      }) => (
        <FormButton
          onConfirm={onConfirm}
          onDownload={onDownload}
          value={value}
          isValid={isValid}
          ref={ref}
        >
          <UrlTextField
            isRequired
            inputRef={inputRef}
            value={value}
            onChange={(e) => {
              onChange(e.currentTarget.value)
            }}
            error={!!fieldState.error} // エラー状態
            helperText={fieldState.error?.message} // エラーメッセージ
          />
        </FormButton>
      )}
    />
  )
}
