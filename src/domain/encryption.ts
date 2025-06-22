
const WPA = 'WPA'
const WEP = 'WEP'
const nopass = 'nopass'
export const encryption = {
  WPA : 'WPA/WPA2/WPA3',
  WEP: 'WEP',
  nopass: ''
}
export const encryptionKeys = [WPA, WEP, nopass] as const

export const isWPA = (value: string) => value === WPA
export const isWEP = (value: string) => value === WEP
export const isNonpass = (value: string) => value === nopass