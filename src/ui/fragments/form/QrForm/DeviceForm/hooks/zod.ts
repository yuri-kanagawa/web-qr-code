import { Device } from '@/domains/valueObjects/device'
import { Language } from '@/domains/valueObjects/language'
import { Os } from '@/domains/valueObjects/os'
import { createUrlZodSchema } from '@/domains/valueObjects/url'
import { z } from 'zod'

const device = z.number()
const os = z.number()

const createDeviceItemSchema = (language: Language) => {
  const urlSchema = createUrlZodSchema(language)
  const notSetDevice = Device.notSet(language)
  const notSetOs = Os.notSet(language)

  return z
    .object({
      device,
      url: z.string(),
      os
    })
    .superRefine((data, ctx) => {
      const hasDevice = data.device !== notSetDevice.value
      const hasOs = data.os !== notSetOs.value
      const hasUrl = data.url.trim() !== ''

      // いずれかが入力されている場合、全て必須
      if (hasDevice || hasOs || hasUrl) {
        // deviceが未選択の場合
        if (!hasDevice) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: language.locale.message.validation.device.notSelected,
            path: ['device']
          })
        }

        // osが未選択の場合
        if (!hasOs) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: language.locale.message.validation.device.notSelected,
            path: ['os']
          })
        }

        // urlが未入力の場合（deviceまたはosが選択されている）
        if (!hasUrl) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: language.locale.message.validation.url.required,
            path: ['url']
          })
        }

        // urlが入力されている場合、バリデーションを実施
        if (hasUrl) {
          const urlResult = urlSchema.safeParse(data.url)
          if (!urlResult.success) {
            // URLバリデーションエラー
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                urlResult.error.issues[0]?.message ||
                language.locale.message.validation.url.invalid,
              path: ['url']
            })
          }
        }
      }
    })
}

export const createRegisterDeviceQrCodeSchema = (language: Language) => {
  const notSetDevice = Device.notSet(language)
  const notSetOs = Os.notSet(language)

  return z
    .object({
      devices: z.array(createDeviceItemSchema(language))
    })
    .superRefine((data, ctx) => {
      // 少なくとも1つの完全なセット（device + os + url）が入力されているかチェック
      const hasCompleteSet = data.devices.some((item) => {
        return (
          item.device !== notSetDevice.value &&
          item.os !== notSetOs.value &&
          item.url.trim() !== ''
        )
      })

      if (!hasCompleteSet) {
        // 最初のアイテムにのみエラーを表示
        // （個別アイテムのバリデーションと重複しないように）
        const firstItem = data.devices[0]
        if (firstItem) {
          const hasDevice = firstItem.device !== notSetDevice.value
          const hasOs = firstItem.os !== notSetOs.value
          const hasUrl = firstItem.url.trim() !== ''

          // 最初のアイテムが完全に空の場合のみ、エラーを表示
          if (!hasDevice && !hasOs && !hasUrl) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: language.locale.message.validation.device.notSelected,
              path: ['devices', 0, 'device']
            })
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: language.locale.message.validation.device.notSelected,
              path: ['devices', 0, 'os']
            })
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: language.locale.message.validation.url.required,
              path: ['devices', 0, 'url']
            })
          }
        }
      }
    })
}

export type RegisterDeviceQrCodeSchema = z.infer<
  ReturnType<typeof createRegisterDeviceQrCodeSchema>
>
