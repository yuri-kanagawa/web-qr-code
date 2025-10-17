import { RegisterQrCodeContactSchema } from './zod'

export const convertContact = (value: RegisterQrCodeContactSchema) => {
  const fullName = [value.lastName, value.middleName, value.firstName]
    .filter(Boolean)
    .join(' ')

  let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${fullName}
N:${value.lastName};${value.firstName};${value.middleName};;`

  if (value.organization) {
    vcard += `\nORG:${value.organization}`
  }

  if (value.post) {
    vcard += `\nTITLE:${value.post}`
  }

  if (value.email) {
    vcard += `\nEMAIL:${value.email}`
  }

  if (value.phoneNumber) {
    vcard += `\nTEL;TYPE=HOME:${value.phoneNumber}`
  }

  if (value.workPhone) {
    vcard += `\nTEL;TYPE=WORK:${value.workPhone}`
  }

  if (value.homeAddress) {
    vcard += `\nADR;TYPE=HOME:;;${value.homeAddress};;;;`
  }

  if (value.workAddress) {
    vcard += `\nADR;TYPE=WORK:;;${value.workAddress};;;;`
  }

  if (value.homeUrl) {
    vcard += `\nURL;TYPE=HOME:${value.homeUrl}`
  }

  if (value.workUrl) {
    vcard += `\nURL;TYPE=WORK:${value.workUrl}`
  }

  vcard += `\nEND:VCARD`

  return vcard
}
