import { FC } from 'react'
import { Mobile } from './Mobile'
import { Desktop } from './Desktop'
import { useWindowSize } from '@/hooks'
import { ResponsiveSwitcher } from '@/ui/cores/ResponsiveSwitcher'
type Props = {}

export const AddressForm: FC<Props> = ({}: Props) => {
  return (
    <ResponsiveSwitcher
      desktop={<Desktop />}
      laptop={<Desktop />}
      tablet={<Mobile />}
      mobile={<Mobile />}
    />
  )
}
