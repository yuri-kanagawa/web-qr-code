import { Control, Controller } from 'react-hook-form'
import { RegisterQrCodeUrlSchema } from '@/ui/pages/root/hooks'
import React from 'react'
import { useWindowSize } from '@/hooks'
import { usePathQueryParameter } from '@/ui/pages/root/hooks/usePathQueryParameter'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export type Props = {
  control: Control<RegisterQrCodeUrlSchema>
  file: File | null
  setFile: (value: File | null) => void
}

export const ResponsiveSwitcher = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { isOverLaptop } = useWindowSize()

    return (
      <>
        {isOverLaptop && <Desktop {...props} ref={ref} />}
        {!isOverLaptop && <Mobile ref={ref} {...props} />}
      </>
    )
  }
)
