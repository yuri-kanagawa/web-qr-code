export const convertStringToBoolean = (str: string): boolean => {
  if (str.toLowerCase() === 'true') {
    return true
  } else if (str.toLowerCase() === 'false') {
    return false
  } else {
    return false
  }
}
