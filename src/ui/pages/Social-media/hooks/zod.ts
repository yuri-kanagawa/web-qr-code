import { z } from "zod"
const language = z.string()
const socialMedia = z.number()
const url = z.string()
const label = z.string()

export const registerSocialMediaQrCodeSchema = z.object({
  socialMedia: z.array(
    z.object({

      socialMedia,
      url,
      label
    })
  ),
  language
})

export type RegisterSocialMediaQrCodeSchema = z.infer<typeof registerSocialMediaQrCodeSchema>