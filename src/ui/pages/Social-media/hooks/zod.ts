import { z } from 'zod'
const languageSchema = z.string()
const socialMedia = z.number()
const url = z.string()
const label = z.string()

export const registerSocialMediaQrCodeSchema = z.object({
  socialMedia: z.array(
    z.object({
      url,
      label
    })
  ),
  language: languageSchema
})

export type RegisterSocialMediaQrCodeSchema = z.infer<
  typeof registerSocialMediaQrCodeSchema
>
