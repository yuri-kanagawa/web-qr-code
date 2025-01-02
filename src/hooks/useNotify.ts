import { useContext } from 'react'
import { NotifyContext } from '@/stores'

export const useNotify = () => {
  const context = useContext(NotifyContext)
  const successNotify = (message: string) => context!(message, 'success')
  const errorNotify = (message: string) => context!(message, 'error')
  const warningNotify = (message: string) => context!(message, 'warning')

  return { successNotify, errorNotify, warningNotify }
}
