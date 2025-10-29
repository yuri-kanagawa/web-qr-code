'use client'
import { QrCode } from '@/domains'
import { Device } from '@/domains/valueObjects/device'
import { DeviceSelect, FormButton, OsSelect } from '@/features/qr-code'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import AddIcon from '@mui/icons-material/Add'
import { Button, Stack } from '@mui/material'
import { FC, useState } from 'react'
import { Controller } from 'react-hook-form'
import { SortableDeviceItem } from './_internal'
import { useViewModel } from './viewModels'
import { Os } from '@/domains/valueObjects/os'
import { UrlTextField } from '@/ui/fragments/textField'

type Props = {
  qr: QrCode
  onChange: (qr: QrCode) => void
}
export const DeviceForm: FC<Props> = ({ qr, onChange }) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(qr)

  const {
    control,
    formState: { isValid },
    setDeviceValue,
    trigger,
    fields,
    sensors,
    handleDragEnd,
    handleAddDevice,
    remove,
    syncDeviceData,
    hasIncompleteDevices,
    allCombinationsUsed,
    getHiddenItemsForField
  } = useViewModel({
    qr: currentQr,
    onChange: (newQr) => {
      setCurrentQr(newQr)
      onChange(newQr)
    }
  })

  return (
    <FormButton
      qr={currentQr}
      onChange={(newQr) => {
        setCurrentQr(newQr)
        onChange(newQr)
      }}
      isValid={isValid}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <Stack spacing={2}>
            {fields.map((field, index) => {
              const { hiddenOsItems, hiddenDeviceItems } =
                getHiddenItemsForField(index)

              // 2個以上あれば削除可能
              const canDelete = fields.length > 1

              return (
                <SortableDeviceItem
                  key={field.id}
                  id={field.id}
                  canDelete={canDelete}
                  onDelete={() => {
                    remove(index)
                    syncDeviceData()
                  }}
                >
                  <Controller
                    control={control}
                    name={`devices.${index}.os`}
                    render={({ field: { value, onChange }, fieldState: { error } }) => {
                      const osResult = Os.create(value, qr.language)
                      const os =
                        osResult.isSuccess && osResult.os
                          ? osResult.os
                          : Os.notSet(qr.language)

                      return (
                        <OsSelect
                          value={os}
                          onChange={(selectedOs) => {
                            onChange(selectedOs.value)

                            // OS選択後の状態で利用可能なDeviceを再計算
                            const { hiddenDeviceItems: newHiddenDeviceItems } =
                              getHiddenItemsForField(index, selectedOs.value)

                            const availableDevices = Device.list.filter((d) => {
                              if (newHiddenDeviceItems.includes(d)) return false
                              const deviceObj = Device.create(d, qr.language)
                              return deviceObj.isSuccess && !deviceObj.device!.isNotSet
                            })

                            // 選択可能なDeviceが1つだけの場合は自動設定
                            if (availableDevices.length === 1) {
                              setDeviceValue(index, availableDevices[0])
                            }

                            // フォーム全体を再バリデーション
                            trigger()

                            // ドメインのdeviceDataを更新
                            syncDeviceData()
                          }}
                          language={qr.language}
                          isRequired={true}
                          hiddenItems={hiddenOsItems}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )
                    }}
                  />
                  <Controller
                    control={control}
                    name={`devices.${index}.device`}
                    render={({ field: { value, onChange }, fieldState: { error } }) => {
                      const deviceResult = Device.create(value, qr.language)
                      const device =
                        deviceResult.isSuccess && deviceResult.device
                          ? deviceResult.device
                          : Device.notSet(qr.language)

                      return (
                        <DeviceSelect
                          value={device}
                          onChange={(selectedDevice) => {
                            onChange(selectedDevice.value)
                            // フォーム全体を再バリデーション
                            trigger()
                            // ドメインのdeviceDataを更新
                            syncDeviceData()
                          }}
                          language={qr.language}
                          isRequired={true}
                          hiddenItems={hiddenDeviceItems}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )
                    }}
                  />
                  <Controller
                    control={control}
                    name={`devices.${index}.url`}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <UrlTextField
                        value={value}
                        onChange={(event) => {
                          onChange(event.target.value)
                        }}
                        onBlur={() => {
                          // フォームフィールドからフォーカスが外れた時に確実にデータを同期
                          syncDeviceData()
                        }}
                        isRequired={true}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                </SortableDeviceItem>
              )
            })}
            <Button
              onClick={handleAddDevice}
              variant="outlined"
              disabled={hasIncompleteDevices() || allCombinationsUsed()}
            >
              <AddIcon />
            </Button>
          </Stack>
        </SortableContext>
      </DndContext>
    </FormButton>
  )
}
