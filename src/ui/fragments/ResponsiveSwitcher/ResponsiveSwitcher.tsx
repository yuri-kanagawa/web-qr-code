import { FC, ReactNode } from 'react'
import { useWindowSize } from '@/hooks'

type Props = {
  desktop?: ReactNode
  laptop?: ReactNode
  tablet?: ReactNode
  mobile?: ReactNode
}

export const ResponsiveSwitcher: FC<Props> = ({
  desktop,
  laptop,
  tablet,
  mobile
}) => {
  const { isOverDesktop, isLaptop, isTablet, isMobile } = useWindowSize()
  return (
    <>
      {isOverDesktop && desktop}
      {isLaptop && laptop}
      {isTablet && tablet}
      {isMobile && mobile}
    </>
  )
}
