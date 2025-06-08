export const isPhone = (value: string) => value.startsWith('tel')
export const formatPhoneNumberForTel = (value: string) => `tel:${value}`
