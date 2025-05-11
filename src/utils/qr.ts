import { MutableRefObject } from 'react'

export const extractPngDataUrl = (
  ref: MutableRefObject<HTMLDivElement | null>
): string | null => {
  if (ref == null) {
    return null
  }
  if (!ref.current) {
    console.log('ref is null or undefined')
    return null
  }
  const canvas = ref.current.children[0] as HTMLCanvasElement
  if (!canvas) return null
  const pngDataUrl = canvas.toDataURL('image/png')
  return pngDataUrl
}

export const isUrl = (value: string) =>
  value.startsWith('https') || value.startsWith('http')
export const isSms = (value: string) => value.startsWith('sms')

export const isPhone = (value: string) => value.startsWith('tel')
export const formatPhoneNumberForTel = (value: string) => `tel:${value}`

export const formatEmail = ({
  email,
  subject,
  body
}: {
  email?: string
  subject?: string
  body?: string
}) => {
  return `'mailto:${email}?subject=${subject}&body=${body}'`
}
