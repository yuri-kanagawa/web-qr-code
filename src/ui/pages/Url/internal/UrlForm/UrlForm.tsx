import { Control, Controller } from 'react-hook-form'

import React, { FC, useEffect } from 'react'
import { RegisterQrCodeUrlSchema, useUrlQRCodeForm } from '../../hooks'

import { FormButton } from '@/ui/fragments/form/FormButton'
import { UrlTextField } from '@/ui/cores/textField'

type Props = {}

export const UrlForm: FC<Props> = ({}) => {
  const { file, setFile, control, onConfirm, onDownload, ref } =
    useUrlQRCodeForm()

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
          setFile={setFile}
          file={file}
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
