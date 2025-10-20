import { RegisterQrCodeMapSchema } from './zod'

export const formatMapUrl = (data: RegisterQrCodeMapSchema): string => {
  const { latitude, longitude } = data
  return `https://maps.google.com/?q=${latitude},${longitude}`
}
export const isMapUrl = (url: string): boolean => {
  return url.includes('https://maps.google.com/?q=')
}
