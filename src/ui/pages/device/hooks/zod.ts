import { z } from "zod";

const url = z.string()
const device = z.number()
const os = z.number()

export const registerDeviceQrCodeSchema = z.object({
  devices: z.array(
    z.object({
      device,
      url,
      os
    })
  ).min(1, {message: '一つ以上選択しないと'})
})

export type RegisterDeviceQrCodeSchema = z.infer<typeof registerDeviceQrCodeSchema>