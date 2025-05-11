export function isValidUrl(url: string): boolean {
  const pattern =
    /^(https?:\/\/)?([a-z0-9]+[.-_])*[a-z0-9]+\.[a-z]{2,6}(\/[a-zA-Z0-9-_]*)*\/?$/i
  return pattern.test(url)
}

export function validateInternationalPhoneNumber(phoneNumber: string): boolean {
  const pattern = /^\+(\d{1,3})\s\d{1,4}\s\d{3,4}\s\d{4}$/
  return pattern.test(phoneNumber)
}
