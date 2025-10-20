import { Device } from '@/domains/valueObjects/device'
import { Language } from '@/domains/valueObjects/language'
import { Os } from '@/domains/valueObjects/os'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { DeviceSelect, OsSelect } from '@/ui/fragments/select'
import { UrlTextField } from '@/ui/fragments/textField'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CancelIcon from '@mui/icons-material/Cancel'
import { IconButton, Stack } from '@mui/material'
import { FC } from 'react'
import { Controller } from 'react-hook-form'

type Props = {
  id: string
  index: number
  language: Language
  hiddenOsItems: number[]
  hiddenDeviceItems: number[]
  canDelete: boolean
  control: any
  setValue: any
  trigger: any
  getHiddenItemsForField: (index: number, selectedOs?: number) => any
  remove: (index: number) => void
  onDeviceDataChange: () => void
}

export const SortableDeviceItem: FC<Props> = ({
  id,
  index,
  language,
  hiddenOsItems,
  hiddenDeviceItems,
  canDelete,
  control,
  setValue,
  trigger,
  getHiddenItemsForField,
  remove,
  onDeviceDataChange
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <FormCard
        cardProps={{
          sx: {
            p: 2,
            position: 'relative',
            overflow: 'visible',
            cursor: 'grab',
            '&:active': {
              cursor: 'grabbing'
            }
          }
        }}
      >
        <div
          {...listeners}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        />
        <IconButton
          onClick={() => {
            remove(index)
            // ドメインのdeviceDataを更新
            onDeviceDataChange()
          }}
          color="error"
          disabled={!canDelete}
          size="small"
          sx={{
            position: 'absolute',
            top: -16,
            right: -16,
            zIndex: 2
          }}
        >
          <CancelIcon />
        </IconButton>
        <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
          <Controller
            control={control}
            name={`devices.${index}.os`}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
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

                    const availableDevices = Device.list.filter((d) => {
                      if (newHiddenDeviceItems.includes(d)) return false
                      const deviceObj = Device.create(d, language)
                      return deviceObj.isSuccess && !deviceObj.device!.isNotSet
                    })

                    // 選択可能なDeviceが1つだけの場合は自動設定
                    if (availableDevices.length === 1) {
                      setValue(`devices.${index}.device`, availableDevices[0])
                    }

                    // フォーム全体を再バリデーション
                    trigger()

                    // ドメインのdeviceDataを更新
                    onDeviceDataChange()
                  }}
                  language={language}
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
              const deviceResult = Device.create(value, language)
              const device =
                deviceResult.isSuccess && deviceResult.device
                  ? deviceResult.device
                  : Device.notSet(language)

              return (
                <DeviceSelect
                  value={device}
                  onChange={(selectedDevice) => {
                    onChange(selectedDevice.value)
                    // フォーム全体を再バリデーション
                    trigger()
                    // ドメインのdeviceDataを更新
                    onDeviceDataChange()
                  }}
                  language={language}
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
                onChange={(newValue) => {
                  onChange(newValue)
                  // ドメインのdeviceDataを更新
                  onDeviceDataChange()
                }}
                isRequired={true}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </FormCard>
    </div>
  )
}
