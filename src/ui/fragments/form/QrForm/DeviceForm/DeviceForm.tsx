'use client'
import { Language } from '@/domains'
import { Device } from '@/domains/valueObjects/device'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { DeviceSelect, OsSelect } from '@/ui/fragments/select'
import { UrlTextField } from '@/ui/fragments/textField'
import { Button, Stack } from '@mui/material'
import { FC } from 'react'
import { Controller, useFieldArray, useWatch } from 'react-hook-form'
import { useDeviceQrCodeForm } from './hooks'

type Props = {
  language: Language
}
export const DeviceForm: FC<Props> = ({ language }) => {
  const locale = language.getLocale()
  const { word } = locale

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

  // 現在のフォーム値を監視
  const devices = useWatch({ control, name: 'devices' })

  // 各フィールドの非表示項目を計算
  const getHiddenItemsForField = (index: number) => {
    const currentDevice = devices?.[index]?.device || 0
    const currentOs = devices?.[index]?.os || 0

    // 他のフィールドで既に選択されている組み合わせを収集
    const usedCombinations =
      devices
        ?.map((device, i) => ({
          device: device.device,
          os: device.os
        }))
        .filter((_, i) => i !== index) || []

    // 現在のフィールドの非表示項目を計算
    const hiddenOsItems: number[] = []
    const hiddenDeviceItems: number[] = []

    // 他のフィールドで既に使用されている組み合わせを非表示にする
    usedCombinations.forEach(({ device, os }) => {
      if (device !== 0 && os !== 0) {
        // 同じOSが選択されている場合、そのOSを非表示にする
        if (currentDevice === device) {
          hiddenOsItems.push(os)
        }
        // 同じデバイスが選択されている場合、そのデバイスを非表示にする
        if (currentOs === os) {
          hiddenDeviceItems.push(device)
        }
      }
    })

    // all選択時の制約
    if (currentDevice === Device.TYPES.ALL) {
      // allが選択されている場合、そのOSは他のフィールドで選択できない
      if (currentOs !== 0) {
        usedCombinations.forEach(({ device, os }) => {
          if (os === currentOs && device !== Device.TYPES.ALL) {
            // 同じOSでall以外のデバイスが選択されている場合、そのOSを非表示にする
            hiddenOsItems.push(os)
          }
        })
      }
    }

    // 他のフィールドでallが選択されている場合の制約
    usedCombinations.forEach(({ device, os }) => {
      if (device === Device.TYPES.ALL && os !== 0) {
        // allが選択されている場合、そのOSは他のフィールドで選択できない
        if (currentDevice !== Device.TYPES.ALL) {
          hiddenOsItems.push(os)
        }
      }
    })

    // all以外を選択した場合の制約
    if (
      currentDevice !== Device.TYPES.ALL &&
      currentDevice !== 0 &&
      currentOs !== 0
    ) {
      // 現在のフィールドでall以外のデバイスが選択されている場合
      usedCombinations.forEach(({ device, os }) => {
        if (os === currentOs && device === Device.TYPES.ALL) {
          // 同じOSでallが選択されている場合、そのOSのallは非表示にする
          hiddenDeviceItems.push(Device.TYPES.ALL)
        }
      })
    }

    // 他のフィールドでall以外が選択されている場合の制約
    usedCombinations.forEach(({ device, os }) => {
      if (device !== Device.TYPES.ALL && device !== 0 && os !== 0) {
        // 他のフィールドでall以外のデバイスが選択されている場合
        if (currentOs === os) {
          // 同じOSの場合、allは非表示にする
          hiddenDeviceItems.push(Device.TYPES.ALL)
        }
      }
    })

    return {
      hiddenOsItems: Array.from(new Set(hiddenOsItems)), // 重複を除去
      hiddenDeviceItems: Array.from(new Set(hiddenDeviceItems)) // 重複を除去
    }
  }

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      ref={ref}
      value={url}
      isValid={isValid}
    >
      <Stack spacing={2}>
        {fields.map((field, index) => {
          const { hiddenOsItems, hiddenDeviceItems } =
            getHiddenItemsForField(index)

          return (
            <Stack
              key={field.id}
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Controller
                control={control}
                name={`devices.${index}.os`}
                render={({ field: { value, onChange } }) => (
                  <OsSelect
                    value={value}
                    onChange={({ id }) => onChange(id)}
                    hiddenItems={hiddenOsItems}
                  />
                )}
              />
              <Controller
                control={control}
                name={`devices.${index}.device`}
                render={({ field: { value, onChange } }) => (
                  <DeviceSelect
                    value={value}
                    onChange={({ id }) => onChange(id)}
                    language={language}
                    hiddenItems={hiddenDeviceItems}
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
                {word.buttons.delete}
              </Button>
            </Stack>
          )
        })}
        <Button
          onClick={() => append({ os: 0, device: 0, url: '' })}
          variant="outlined"
        >
          {word.buttons.add}
        </Button>
      </Stack>
    </FormButton>
  )
}
