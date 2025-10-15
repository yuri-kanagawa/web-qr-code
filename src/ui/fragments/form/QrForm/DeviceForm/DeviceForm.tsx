'use client'
import { Language } from '@/domains'
import { Device } from '@/domains/valueObjects/device'
import { Os } from '@/domains/valueObjects/os'
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
    formState: { isValid },
    setValue
  } = useDeviceQrCodeForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'devices'
  })

  // 現在のフォーム値を監視
  const devices = useWatch({ control, name: 'devices' })

  // 各フィールドの非表示項目を計算
  const getHiddenItemsForField = (index: number, selectedOs?: number) => {
    const currentDevice = devices?.[index]?.device || 0
    // selectedOsが渡された場合はそれを使用（OS選択直後の計算用）
    const currentOs =
      selectedOs !== undefined ? selectedOs : devices?.[index]?.os || 0

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
    if (Device.isAll(currentDevice)) {
      // allが選択されている場合、そのOSは他のフィールドで選択できない
      if (currentOs !== 0) {
        usedCombinations.forEach(({ device, os }) => {
          if (os === currentOs && !Device.isAll(device)) {
            // 同じOSでall以外のデバイスが選択されている場合、そのOSを非表示にする
            hiddenOsItems.push(os)
          }
        })
      }
    }

    // 他のフィールドでallが選択されている場合の制約
    usedCombinations.forEach(({ device, os }) => {
      if (Device.isAll(device) && os !== 0) {
        // allが選択されている場合、そのOSは他のフィールドで選択できない
        if (!Device.isAll(currentDevice)) {
          hiddenOsItems.push(os)
        }
      }
    })

    // all以外を選択した場合の制約
    if (
      !Device.isAll(currentDevice) &&
      !Device.isNotSet(currentDevice) &&
      currentOs !== 0
    ) {
      // 現在のフィールドでall以外のデバイスが選択されている場合
      usedCombinations.forEach(({ device, os }) => {
        if (os === currentOs && Device.isAll(device)) {
          // 同じOSでallが選択されている場合、そのOSのallは非表示にする
          hiddenDeviceItems.push(Device.TYPES.ALL)
        }
      })
    }

    // 他のフィールドでall以外が選択されている場合の制約
    usedCombinations.forEach(({ device, os }) => {
      if (!Device.isAll(device) && !Device.isNotSet(device) && os !== 0) {
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
      language={language}
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
                render={({ field: { value, onChange } }) => {
                  const osResult = Os.create(value, language)
                  const os =
                    osResult.isSuccess && osResult.os
                      ? osResult.os
                      : Os.notSet(language)

                  return (
                    <OsSelect
                      value={os}
                      onChange={(selectedOs) => {
                        onChange(selectedOs.value)

                        // OS選択後の状態で利用可能なDeviceを再計算
                        const { hiddenDeviceItems: newHiddenDeviceItems } =
                          getHiddenItemsForField(index, selectedOs.value)

                        const availableDevices = Device.list.filter(
                          (d) =>
                            !newHiddenDeviceItems.includes(d) &&
                            !Device.isNotSet(d)
                        )

                        // 選択可能なDeviceが1つだけの場合は自動設定
                        if (availableDevices.length === 1) {
                          setValue(
                            `devices.${index}.device`,
                            availableDevices[0]
                          )
                        }
                      }}
                      language={language}
                      hiddenItems={hiddenOsItems}
                    />
                  )
                }}
              />
              <Controller
                control={control}
                name={`devices.${index}.device`}
                render={({ field: { value, onChange } }) => {
                  const deviceResult = Device.create(value, language)
                  const device =
                    deviceResult.isSuccess && deviceResult.device
                      ? deviceResult.device
                      : Device.notSet(language)

                  return (
                    <DeviceSelect
                      value={device}
                      onChange={(selectedDevice) =>
                        onChange(selectedDevice.value)
                      }
                      language={language}
                      hiddenItems={hiddenDeviceItems}
                    />
                  )
                }}
              />
              <Controller
                control={control}
                name={`devices.${index}.url`}
                render={({ field: { value, onChange } }) => (
                  <UrlTextField value={value} onChange={onChange} />
                )}
              />
              <Button
                onClick={() => remove(index)}
                color="error"
                disabled={fields.length === 1}
              >
                {word.buttons.delete}
              </Button>
            </Stack>
          )
        })}
        <Button
          onClick={() => append({ os: 0, device: 0, url: '' })}
          variant="outlined"
          disabled={devices?.some(
            (d) => Device.isNotSet(d.device) || Os.isNotSet(d.os)
          )}
        >
          {word.buttons.add}
        </Button>
      </Stack>
    </FormButton>
  )
}
