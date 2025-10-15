import { Language } from '@/domains/valueObjects/language'
import { createUrlZodSchema } from '@/domains/valueObjects/url'
import { z } from 'zod'

const device = z.number()
const os = z.number()

const createDeviceItemSchema = (language: Language) => {
  const urlSchema = createUrlZodSchema(language)

  return z
    .object({
      device,
      url: z.string(),
      os
    })
    .superRefine((data, ctx) => {
      const hasDevice = data.device !== 0
      const hasOs = data.os !== 0
      const hasUrl = data.url.trim() !== ''

      // いずれかが入力されている場合
      if (hasDevice || hasOs || hasUrl) {
        // deviceが未選択の場合
        if (!hasDevice) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: language.isEnglish ? 'Not selected' : '未選択です',
            path: ['device']
          })
        }

        // osが未選択の場合
        if (!hasOs) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: language.isEnglish ? 'Not selected' : '未選択です',
            path: ['os']
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
                (language.isEnglish
                  ? 'Please enter a valid URL'
                  : '有効なURLを入力してください'),
              path: ['url']
            })
          }
        } else {
          // urlが未入力の場合
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: language.isEnglish
              ? 'Please enter URL'
              : 'URLを入力してください',
            path: ['url']
          })
        }
      }
    })
}

export const createRegisterDeviceQrCodeSchema = (language: Language) => {
  return z.object({
    devices: z.array(createDeviceItemSchema(language))
  })
}

export type RegisterDeviceQrCodeSchema = z.infer<
  ReturnType<typeof createRegisterDeviceQrCodeSchema>
>
