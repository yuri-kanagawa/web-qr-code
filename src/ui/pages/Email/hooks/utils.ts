import {RegisterQrCodeEmailSchema} from './index'

export const formatEmail = ({
  email,
  subject,
  body
}: RegisterQrCodeEmailSchema) => {
  return `'mailto:${email}?subject=${subject}&body=${body}'`
}

export const isEmail = (value: string) => {
  return value.startsWith('sms')
}