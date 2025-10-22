'use client'
import { Language, QrCode } from '@/domains'
import { DeviceQrCodeData } from '@/domains/entities/qr/data/DeviceQrCodeData'
import { DeviceOsService } from '@/domains/services/deviceOs'
import { Device } from '@/domains/valueObjects/device'
import { Os } from '@/domains/valueObjects/os'
import { Url } from '@/domains/valueObjects/url'
import { FormButton } from '@/ui/fragments/form/FormButton'
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
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import AddIcon from '@mui/icons-material/Add'
import { Button, Stack } from '@mui/material'
import { FC } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import { SortableDeviceItem } from './_internal'
import { useDeviceQrCodeForm } from './hooks'

type Props = {
  language: Language
  qr: QrCode
  onChange: (qr: QrCode) => void
}
export const DeviceForm: FC<Props> = ({ language, qr, onChange }) => {
  const {
    control,
    formState: { isValid },
    setValue,
    trigger
  } = useDeviceQrCodeForm({ language, qr })

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
      // ドメインのdeviceDataを更新
      setTimeout(updateDeviceData, 0)
    }
  }

  // 現在のフォーム値を監視
  const devices = useWatch({ control, name: 'devices' })

  // ドメインのdeviceDataを更新する関数
  const updateDeviceData = () => {
    if (!devices) return

    // 有効な組み合わせのみ抽出
    const valid = devices.filter(
      (d) =>
        typeof d?.device === 'number' &&
        typeof d?.os === 'number' &&
        typeof d?.url === 'string'
    )

    let deviceData = DeviceQrCodeData.default(language)

    if (valid.length > 0) {
      // 先頭要素を更新
      const firstDevice = Device.create(valid[0].device, language)
      const firstOs = Os.create(valid[0].os, language)
      const firstUrl = Url.create(valid[0].url, language)
      if (firstDevice.isSuccess && firstOs.isSuccess && firstUrl.isSuccess) {
        deviceData = deviceData.updateDeviceOsUrl(
          0,
          firstDevice.device!,
          firstOs.os!,
          firstUrl.url!
        )
      }

      // 2件目以降を追加
      for (let i = 1; i < valid.length; i++) {
        const dv = Device.create(valid[i].device, language)
        const ov = Os.create(valid[i].os, language)
        const uv = Url.create(valid[i].url, language)
        if (dv.isSuccess && ov.isSuccess && uv.isSuccess) {
          deviceData = deviceData.addDeviceOsUrl(dv.device!, ov.os!, uv.url!)
        }
      }
    }

    const next = qr.updateDeviceData(deviceData)
    onChange(next)
  }

  // ValueObjectヘルパー関数
  const createDeviceValueObject = (value: number) => {
    const result = Device.create(value, language)
    return result.isSuccess ? result.device! : null
  }

  const createOsValueObject = (value: number) => {
    const result = Os.create(value, language)
    return result.isSuccess ? result.os! : null
  }

  // デバイスセットが完全に選択されているかチェック
  const isDeviceComplete = (
    device: { device: number; os: number } | undefined
  ): boolean => {
    if (!device) return false

    const deviceObj = createDeviceValueObject(device.device)
    const osObj = createOsValueObject(device.os)

    if (!deviceObj || !osObj) return false

    return !deviceObj.isNotSet && !osObj.isNotSet
  }

  // 未選択のデバイスまたはOSが存在するかチェック（追加ボタンの制御用）
  const hasIncompleteDevices = () => {
    if (!devices) return false
    return devices.some((d) => !isDeviceComplete(d))
  }

  // すべての組み合わせが使用されているかチェック
  const allCombinationsUsed = () => {
    if (!devices) return false

    // 使用済みの組み合わせIDを収集
    const usedCombinationIds = new Set<number>()
    // AllデバイスとOS組み合わせを追跡
    const usedOsTypesWithAll = new Set<string>()

    devices.forEach((item) => {
      const deviceObj = createDeviceValueObject(item.device)
      const osObj = createOsValueObject(item.os)

      if (deviceObj && osObj && !deviceObj.isNotSet && !osObj.isNotSet) {
        const combinationId = DeviceOsService.getDeviceOs(deviceObj, osObj)
        usedCombinationIds.add(combinationId)

        // AllデバイスとOSの組み合わせを記録（OSの種類を文字列で識別）
        if (deviceObj.isAll) {
          if (osObj.isWindows) usedOsTypesWithAll.add('windows')
          if (osObj.isMacintosh) usedOsTypesWithAll.add('macintosh')
          if (osObj.isIos) usedOsTypesWithAll.add('ios')
          if (osObj.isAndroid) usedOsTypesWithAll.add('android')
          if (osObj.isLinux) usedOsTypesWithAll.add('linux')
          if (osObj.isOther) usedOsTypesWithAll.add('other')
        }
      }
    })

    // すべてのOS（6つ）にAllが設定されている場合、追加不可
    // Windows, Macintosh, iOS, Android, Linux, Other = 6種類
    if (usedOsTypesWithAll.size >= 6) {
      return true
    }

    // NOT_SET以外の全組み合わせ数は24種類
    // (6 OS × 4 Device = 24)
    return usedCombinationIds.size >= 24
  }

  // 各フィールドの非表示項目を計算
  const getHiddenItemsForField = (index: number, selectedOs?: number) => {
    const notSetDevice = Device.notSet(language)
    const notSetOs = Os.notSet(language)

    const currentDevice = devices?.[index]?.device ?? notSetDevice.value
    // selectedOsが渡された場合はそれを使用（OS選択直後の計算用）
    const currentOs =
      selectedOs !== undefined
        ? selectedOs
        : devices?.[index]?.os ?? notSetOs.value

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
      const usedDeviceObj = createDeviceValueObject(device)
      const usedOsObj = createOsValueObject(os)

      if (
        usedDeviceObj &&
        usedOsObj &&
        !usedDeviceObj.isNotSet &&
        !usedOsObj.isNotSet
      ) {
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

    // ValueObjectを作成してドメインロジックを使用
    const currentDeviceObj = createDeviceValueObject(currentDevice)
    const currentOsObj = createOsValueObject(currentOs)

    // all選択時の制約
    if (currentDeviceObj && currentDeviceObj.isAll) {
      // allが選択されている場合、そのOSは他のフィールドで選択できない
      if (currentOsObj && !currentOsObj.isNotSet) {
        usedCombinations.forEach(({ device, os }) => {
          const usedDeviceObj = createDeviceValueObject(device)
          if (os === currentOs && usedDeviceObj && !usedDeviceObj.isAll) {
            // 同じOSでall以外のデバイスが選択されている場合、そのOSを非表示にする
            hiddenOsItems.push(os)
          }
        })
      }
    }

    // 他のフィールドでallが選択されている場合の制約
    usedCombinations.forEach(({ device, os }) => {
      const usedDeviceObj = createDeviceValueObject(device)
      const usedOsObj = createOsValueObject(os)

      if (
        usedDeviceObj &&
        usedDeviceObj.isAll &&
        usedOsObj &&
        !usedOsObj.isNotSet
      ) {
        // allが選択されている場合、そのOSは他のフィールドで選択できない
        if (currentDeviceObj && !currentDeviceObj.isAll) {
          hiddenOsItems.push(os)
        }
      }
    })

    // all以外を選択した場合の制約
    if (
      currentDeviceObj &&
      !currentDeviceObj.isAll &&
      !currentDeviceObj.isNotSet &&
      currentOsObj &&
      !currentOsObj.isNotSet
    ) {
      // 現在のフィールドでall以外のデバイスが選択されている場合
      usedCombinations.forEach(({ device, os }) => {
        const usedDeviceObj = createDeviceValueObject(device)
        if (os === currentOs && usedDeviceObj && usedDeviceObj.isAll) {
          // 同じOSでallが選択されている場合、そのOSのallは非表示にする
          const allDevice = Device.all(language)
          hiddenDeviceItems.push(allDevice.value)
        }
      })
    }

    // 他のフィールドでall以外が選択されている場合の制約
    usedCombinations.forEach(({ device, os }) => {
      const usedDeviceObj = createDeviceValueObject(device)
      const usedOsObj = createOsValueObject(os)

      if (
        usedDeviceObj &&
        !usedDeviceObj.isAll &&
        !usedDeviceObj.isNotSet &&
        usedOsObj &&
        !usedOsObj.isNotSet
      ) {
        // 他のフィールドでall以外のデバイスが選択されている場合
        if (currentOs === os) {
          // 同じOSの場合、allは非表示にする
          const allDevice = Device.all(language)
          hiddenDeviceItems.push(allDevice.value)
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
      language={language}
      qr={qr}
      onChange={onChange}
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
                  language={language}
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
              onClick={() => {
                const notSetDevice = Device.notSet(language)
                const notSetOs = Os.notSet(language)
                append({
                  os: notSetOs.value,
                  device: notSetDevice.value,
                  url: ''
                })
                // ドメインのdeviceDataを更新
                setTimeout(updateDeviceData, 0)
              }}
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
