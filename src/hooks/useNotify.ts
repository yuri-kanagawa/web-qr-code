import { NotifyContext } from '@/stores'
import { useContext } from 'react'

export const useNotify = () => {
  const context = useContext(NotifyContext)

  if (!context) {
    console.error(
      'NotifyContext is undefined! NotifyProvider may not be properly set up.'
    )
    return {
      successNotify: (message: string) =>
        console.log('NotifyContext unavailable - success:', message),
      errorNotify: (message: string) =>
        console.log('NotifyContext unavailable - error:', message),
      warningNotify: (message: string) =>
        console.log('NotifyContext unavailable - warning:', message)
    }
  }

  const successNotify = (message: string) => context(message, 'success')
  const errorNotify = (message: string) => context(message, 'error')
  const warningNotify = (message: string) => context(message, 'warning')

  return { successNotify, errorNotify, warningNotify }
}
