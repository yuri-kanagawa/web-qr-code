import { FC } from 'react'
import { ResponsiveSwitcher } from '@/ui/cores/ResponsiveSwitcher'
import { Desktop } from './Device/Desktop'
import { Mobile } from './Device/Mobile'

import { NameProps } from '@/ui/cores/textField/NameTextField/Device/Common/'

type Props = NameProps
export const NameTextField: FC<Props> = (props) => {
  return (
    <ResponsiveSwitcher
      desktop={<Desktop {...props} />}
      laptop={<Desktop {...props} />}
      tablet={<Mobile {...props} />}
      mobile={<Mobile {...props} />}
    />
  )
}
