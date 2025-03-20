import { FC } from 'react'
import { Mobile } from './Device/Mobile'
import { Desktop } from './Device/Desktop'
import { useWindowSize } from '@/hooks'
import { ResponsiveSwitcher } from '@/ui/cores/ResponsiveSwitcher'
import { AddressTextFieldProps } from './Device/Common'
type Props = AddressTextFieldProps

export const AddressForm: FC<Props> = (props) => {
  return (
    <ResponsiveSwitcher
      desktop={<Desktop {...props} />}
      laptop={<Desktop {...props} />}
      tablet={<Mobile {...props} />}
      mobile={<Mobile {...props} />}
    />
  )
}
