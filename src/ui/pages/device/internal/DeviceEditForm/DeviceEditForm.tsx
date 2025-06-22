'use client'
import { FC } from 'react'
import { useDeviceQrCodeForm } from '../../hooks'
import { useFieldArray, Controller, useFormState } from 'react-hook-form'
import { Stack, Button } from '@mui/material'
import { OsSelect, DeviceSelect } from '@/ui/fragments/select'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { UrlTextField } from '@/ui/fragments/textField'

export const DeviceEditForm: FC = () => {
  const {
    control,
    onConfirm,
    onDownload,
    ref,
    url,
    formState: { isValid }
  } = useDeviceQrCodeForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'devices'
  })

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      ref={ref}
      value={url}
      isValid={isValid}
    >
      <Stack spacing={2}>
        {fields.map((field, index) => (
          <Stack key={field.id} direction="row" spacing={2} alignItems="center">
            <Controller
              control={control}
              name={`devices.${index}.os`}
              render={({ field: { value, onChange } }) => (
                <OsSelect value={value} onChange={({ id }) => onChange(id)} />
              )}
            />
            <Controller
              control={control}
              name={`devices.${index}.device`}
              render={({ field: { value, onChange } }) => (
                <DeviceSelect
                  value={value}
                  onChange={({ id }) => onChange(id)}
                />
              )}
            />
            <Controller
              control={control}
              name={`devices.${index}.url`}
              render={({ field: { value, onChange } }) => (
                <UrlTextField value={value} onChange={onChange} />
              )}
            />
            <Button onClick={() => remove(index)} color="error">
              削除
            </Button>
          </Stack>
        ))}
        <Button
          onClick={() => append({ os: 0, device: 0, url: '' })}
          variant="outlined"
        >
          追加
        </Button>
      </Stack>
    </FormButton>
  )
}
