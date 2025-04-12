type UrlToQrcode = {
  url: string
}
export const convertUrlToQrValue = ({ url }: UrlToQrcode) => {
  return url
}

type ContactToQrcode = {
  firstName: string
  lastName: string
  middleName: string
  email: string
}
export const convertContactToQrValue = ({
  firstName,
  middleName,
  lastName,
  email
}: ContactToQrcode) => {
  return `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName};${middleName};;\nFN:${firstName} ${middleName} ${lastName}\nEMAIL:${email}\nEND:VCARD`
}

type SmsToQrcode = {
  phone: string
  message: string
}
export const convertSmsToQrValue = ({ phone, message = '' }: SmsToQrcode) => {
  return `sms:${phone}?body=${encodeURIComponent(message)}`
}

type EmailToQrcode = {
  email: string
  message: string
}

export const convertEmailToQrValue = ({
  email,
  message = ''
}: EmailToQrcode) => {
  return `mailto:${email}?body=${encodeURIComponent(message)}`
}

type PhoneToQrcode = {
  phone: string
}
export const convertPhoneToQrValue = ({ phone }: PhoneToQrcode) => {
  return `tel:${phone}`
}
