import { z } from 'zod'

export const alphanumericSymbolSchema = z
  .string()
  .min(1, 'Alphanumeric symbol cannot be empty')
  .max(2953, 'Alphanumeric symbol must be 2953 characters or less')
  .regex(
    /^[a-zA-Z0-9\s\-_.,!?@#$%^&*()+=\[\]{}|;':"\\,.<>\/?`~]*$/,
    'Only alphanumeric characters and symbols are allowed'
  )
