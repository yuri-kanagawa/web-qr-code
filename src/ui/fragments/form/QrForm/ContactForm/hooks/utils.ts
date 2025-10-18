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

  if (value.mobilePhone) {
    vcard += `\nTEL;TYPE=CELL:${value.mobilePhone}`
  }

  if (value.homePhone) {
    vcard += `\nTEL;TYPE=HOME,VOICE:${value.homePhone}`
  }

  if (value.workMobile) {
    vcard += `\nTEL;TYPE=CELL,WORK:${value.workMobile}`
  }

  if (value.workPhone) {
    vcard += `\nTEL;TYPE=WORK,VOICE:${value.workPhone}`
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
