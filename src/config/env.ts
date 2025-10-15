export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
} as const

export const getAppUrl = (): string => {
  return env.appUrl
}

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production'
}

export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development'
}
