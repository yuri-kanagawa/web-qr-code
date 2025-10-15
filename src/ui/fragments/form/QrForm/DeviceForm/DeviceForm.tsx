'use client'
import { Language } from '@/domains'
import { Device } from '@/domains/valueObjects/device'
import { Os } from '@/domains/valueObjects/os'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { DeviceSelect, OsSelect } from '@/ui/fragments/select'
import { UrlTextField } from '@/ui/fragments/textField'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AddIcon from '@mui/icons-material/Add'
import CancelIcon from '@mui/icons-material/Cancel'
import { Button, IconButton, Stack } from '@mui/material'
import { FC } from 'react'
import { Controller, useFieldArray, useWatch } from 'react-hook-form'
import { useDeviceQrCodeForm } from './hooks'

type SortableDeviceItemProps = {
  id: string
  index: number
  language: Language
  hiddenOsItems: number[]
  hiddenDeviceItems: number[]
  canDelete: boolean
  control: any
  setValue: any
  getHiddenItemsForField: (index: number, selectedOs?: number) => any
  remove: (index: number) => void
}

const SortableDeviceItem: FC<SortableDeviceItemProps> = ({
  id,
  index,
  language,
  hiddenOsItems,
  hiddenDeviceItems,
  canDelete,
  control,
  setValue,
  getHiddenItemsForField,
  remove
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
          onClick={() => remove(index)}
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

                    const availableDevices = Device.list.filter(
                      (d) =>
                        !newHiddenDeviceItems.includes(d) && !Device.isNotSet(d)
                    )

                    // 選択可能なDeviceが1つだけの場合は自動設定
                    if (availableDevices.length === 1) {
                      setValue(`devices.${index}.device`, availableDevices[0])
                    }
                  }}
                  language={language}
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
                  onChange={(selectedDevice) => onChange(selectedDevice.value)}
                  language={language}
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
                onChange={onChange}
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

type Props = {
  language: Language
}
export const DeviceForm: FC<Props> = ({ language }) => {
  const {
    control,
    onConfirm,
    onDownload,
    ref,
    url,
    formState: { isValid },
    setValue
  } = useDeviceQrCodeForm({ language })

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'devices'
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id)
      const newIndex = fields.findIndex((field) => field.id === over.id)

      move(oldIndex, newIndex)
    }
  }

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

              const currentDevice = devices?.[index]
              const canDelete =
                fields.length > 1 &&
                currentDevice &&
                !Device.isNotSet(currentDevice.device) &&
                !Os.isNotSet(currentDevice.os)

              return (
                <SortableDeviceItem
                  key={field.id}
                  id={field.id}
                  index={index}
                  language={language}
                  hiddenOsItems={hiddenOsItems}
                  hiddenDeviceItems={hiddenDeviceItems}
                  canDelete={canDelete}
                  control={control}
                  setValue={setValue}
                  getHiddenItemsForField={getHiddenItemsForField}
                  remove={remove}
                />
              )
            })}
            <Button
              onClick={() => append({ os: 0, device: 0, url: '' })}
              variant="outlined"
              disabled={devices?.some(
                (d) => Device.isNotSet(d.device) || Os.isNotSet(d.os)
              )}
            >
              <AddIcon />
            </Button>
          </Stack>
        </SortableContext>
      </DndContext>
    </FormButton>
  )
}
