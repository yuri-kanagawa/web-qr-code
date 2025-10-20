import { QrCode } from '@/domains'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { TextTextField } from '@/ui/fragments/textField/TextTextField'
import { FC, useState } from 'react'
import { Controller } from 'react-hook-form'
import { QrFormProps } from '../../types'
import { useTextQrCodeForm } from './hooks'

export const TextForm: FC<QrFormProps> = ({
  language,
  qr,
  onChange
}: QrFormProps) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(qr)
  const { control, watch } = useTextQrCodeForm({
    language,
    qr
  })

  return (
    <Controller
      control={control}
      name="text"
      render={({
        field: { value, onChange: fieldOnChange, ref: inputRef },
        formState: { isValid },
        fieldState: { error }
      }) => (
        <FormButton
          isValid={isValid}
          language={language}
          qr={currentQr}
          onChange={(newQr) => {
            setCurrentQr(newQr)
            onChange(newQr)
          }}
        >
          <FormCard cardProps={{ sx: { p: 2 } }}>
            <TextTextField
              value={value}
              onChange={(newValue) => {
                fieldOnChange(newValue) // react-hook-formの状態を更新
                const newQr = qr.changeText(newValue) // QrCodeの状態を更新
                setCurrentQr(newQr) // ローカル状態を更新
                onChange(newQr) // 親コンポーネントに新しいQrCodeを渡す
              }}
              language={language}
              isRequired={true}
            />
          </FormCard>
        </FormButton>
      )}
    />
  )
}
