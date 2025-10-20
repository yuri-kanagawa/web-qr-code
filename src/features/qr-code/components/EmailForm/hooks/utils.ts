import { RegisterQrCodeEmailSchema } from './zod'
export const formatEmail = ({
  email,
  subject,
  body
}: RegisterQrCodeEmailSchema) => {
  return `'mailto:${email.value}?subject=${subject.value}&body=${body.value}'`
}

export const isEmail = (value: string) => {
  return value.startsWith('sms')
}
