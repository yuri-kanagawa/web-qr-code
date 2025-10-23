import { QrCode } from '@/domains'
import { FormButton } from '@/features/qr-code'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { TextTextField } from '@/ui/fragments/textField/TextTextField'
import { FC, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTextQrCodeForm } from './hooks'

interface Props {
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const TextForm: FC<Props> = ({ qr, onChange }: Props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(qr)
  const { control, watch } = useTextQrCodeForm({
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
              language={qr.language}
              isRequired={true}
            />
          </FormCard>
        </FormButton>
      )}
    />
  )
}
