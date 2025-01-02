import { FC } from 'react'
import { useWindowSize } from '@/hooks'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'
export type Props = {
  isOpen: boolean
  toggleOpen: () => void
}

export const ResponsiveSwitcher: FC<Props> = (props) => {
  const { isOverLaptop } = useWindowSize()
  return (
    <>
      {isOverLaptop && <Desktop {...props} />}
      {!isOverLaptop && <Mobile {...props} />}
    </>
  )
}
