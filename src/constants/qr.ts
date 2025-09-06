export const qr = {
  https: 'https',
  http: 'http',
  sms: 'sms',
  tel: 'tel',
  mailto: 'mailto',
  vcard: 'BEGIN:VCARD'
} as const

export const isUrl = (value: string): boolean =>
  value.startsWith(qr.http) || value.startsWith(qr.https)

export const isSms = (value: string): boolean =>
  value.startsWith(qr.sms)

export const isTel = (value: string): boolean =>
  value.startsWith(qr.tel)

export const isMailto = (value: string): boolean =>
  value.startsWith(qr.mailto)

export const isVcard = (value: string): boolean =>
  value.startsWith(qr.vcard)

export const isContact = (value: string): boolean =>
  isSms(value) || isTel(value) || isMailto(value) || isVcard(value)
