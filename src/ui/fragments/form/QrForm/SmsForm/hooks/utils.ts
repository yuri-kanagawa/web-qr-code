import { RegisterQrCodeSmsSchema } from './zod'

export const isSmsSchema = (value: string) => value.startsWith('sms')
export function toSmsSchema(value: RegisterQrCodeSmsSchema) {
  return `sms:${value.phoneNumber}?body=${value.body}`
}
export const fromSmsScheme = (value: string): RegisterQrCodeSmsSchema => {
  if (!value.startsWith('sms:')) {
    return {
      phoneNumber: value,
      body: ''
    }
  }

  const [phonePart, bodyPart] = value.split('?body=')
  const phoneNumber = phonePart.slice(4) // 'sms:' を削除
  const body = bodyPart || ''

  return {
    phoneNumber,
    body
  }
}
