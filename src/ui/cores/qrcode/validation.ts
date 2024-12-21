import z from 'zod'

const bgColor = z.string()
const fgColor = z.string()
const size = z.number()
const level = z.string()

const src = z.string()
const height = z.number()
const width = z.number()
const excavate = z.boolean()

const imageSettings = z.object({
  src,
  height,
  width,
  excavate
})

export const qrSchema = z.object({
  bgColor,
  fgColor,
  size,
  level,
  imageSettings
})
