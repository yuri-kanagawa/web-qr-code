import { MutableRefObject } from 'react'

export const extractPngDataUrl = (
  ref: MutableRefObject<HTMLDivElement | null>
): string | null => {
  if (!ref.current) {
    console.log('ref is null or undefined')
    return null
  }

  // Access the first child as an HTMLCanvasElement
  const canvas = ref.current.children[0] as HTMLCanvasElement
  if (!canvas) return null

  // Generate PNG Data URL
  const pngDataUrl = canvas.toDataURL('image/png')
  console.log('PNG Data URL:', pngDataUrl)
  return pngDataUrl
}

export const isUrl = (value: string) => value.startsWith('https')
