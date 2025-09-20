import z from 'zod'

const firstName = z.string()
const lastName = z.string()
const middleName = z.string()
const phoneNumber = z.string()
const organization = z.string()
const post = z.string()
const businessCellularTelephone = z.string()
const privateCellularTelephone = z.string()
const email = z.string()
const address = z.string()
const url = z.string()

export const registerQrCodeContactSchema = z
  .object({
    firstName,
    lastName,
    middleName,
    phoneNumber,
    organization,
    post,
    businessCellularTelephone,
    privateCellularTelephone,
    email,
    address,
    url
  })

export type RegisterQrCodeContactSchema = z.infer<
  typeof registerQrCodeContactSchema
>
