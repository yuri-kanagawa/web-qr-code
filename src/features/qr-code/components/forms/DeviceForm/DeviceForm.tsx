'use client'
import { QrCode } from '@/domains'
import { FormButton } from '@/features/qr-code'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import AddIcon from '@mui/icons-material/Add'
import { Button, Stack } from '@mui/material'
import { FC, useState } from 'react'
import { SortableDeviceItem } from './_internal'
import { useViewModel } from './viewModels'

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
                  index={index}
                  language={qr.language}
                  hiddenOsItems={hiddenOsItems}
                  hiddenDeviceItems={hiddenDeviceItems}
                  canDelete={canDelete}
                  control={control}
                  trigger={trigger}
                  getHiddenItemsForField={getHiddenItemsForField}
                  remove={remove}
                  syncDeviceData={syncDeviceData}
                  setDeviceValue={setDeviceValue}
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
