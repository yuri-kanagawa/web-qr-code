'use client'
import { QrCode } from '@/domains'
import { FormButton } from '@/features/qr-code'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import AddIcon from '@mui/icons-material/Add'
import { Button, Stack } from '@mui/material'
import { FC } from 'react'
import { SortableDeviceItem } from './_internal'
import { useViewModel } from './viewModels'

type Props = {
  qr: QrCode
  onChange: (qr: QrCode) => void
}
export const DeviceForm: FC<Props> = ({ qr, onChange }) => {
  const {
    control,
    formState: { isValid },
    setValue,
    trigger,
    fields,
    sensors,
    handleDragEnd,
    handleAddDevice,
    remove,
    updateDeviceData,
    hasIncompleteDevices,
    allCombinationsUsed,
    getHiddenItemsForField
  } = useViewModel({ qr, onChange })

  return (
    <FormButton qr={qr} onChange={onChange} isValid={isValid}>
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
                  index={index}
                  language={qr.language}
                  hiddenOsItems={hiddenOsItems}
                  hiddenDeviceItems={hiddenDeviceItems}
                  canDelete={canDelete}
                  control={control}
                  setValue={setValue}
                  trigger={trigger}
                  getHiddenItemsForField={getHiddenItemsForField}
                  remove={remove}
                  onDeviceDataChange={updateDeviceData}
                />
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
