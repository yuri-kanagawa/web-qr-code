export function isValidUrl(url: string): boolean {
  const pattern =
    /^(https?:\/\/)?([a-z0-9]+[.-_])*[a-z0-9]+\.[a-z]{2,6}(\/[a-zA-Z0-9-_]*)*\/?$/i
  return pattern.test(url)
}
