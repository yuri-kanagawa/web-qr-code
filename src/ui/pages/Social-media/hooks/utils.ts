import { RegisterSocialMediaQrCodeSchema } from './zod'

export const isSocialMediaSchema = ({
  value
}: {
  value: string
  language: string
}) => {
  value.startsWith('sms')
}
export function toSocialMediaSchema(value: RegisterSocialMediaQrCodeSchema) {
  const socialMedia = value.socialMedia.map((e) => e.socialMedia).join(',')
  const urls = value.socialMedia.map((e) => e.url).join(',')
  const labels = value.socialMedia.map((e) => e.label).join(',')
  return `${value.socialMedia}?socialMedia=${socialMedia}&urls=${urls}&labels=${labels}`
}
// export const fromSocialMediaScheme = (value: string): RegisterSocialMediaQrCodeSchema => {
//   if (!value.startsWith('sms:')) {
//     return {
//       phoneNumber: value,
//       body: ''
//     }
//   }

//   const [phonePart, bodyPart] = value.split('?body=')
//   const phoneNumber = phonePart.slice(4) // 'sms:' を削除
//   const body = bodyPart || ''

//   return {
//     phoneNumber,
//     body
//   }
// }
