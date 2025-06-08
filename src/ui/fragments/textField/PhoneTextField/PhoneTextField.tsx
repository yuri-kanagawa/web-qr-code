import { FC } from 'react'
import { PhoneProps } from '@/ui/fragments/textField/PhoneTextField/Device/Common/type'
import { ResponsiveSwitcher } from '@/ui/fragments/ResponsiveSwitcher'
import { Desktop, Mobile } from './Device'

export const PhoneTextField: FC<PhoneProps> = (props) => {
  return (
    <ResponsiveSwitcher
      desktop={<Desktop {...props} />}
      laptop={<Desktop {...props} />}
      tablet={<Mobile {...props} />}
      mobile={<Mobile {...props} />}
    />
  )
}
