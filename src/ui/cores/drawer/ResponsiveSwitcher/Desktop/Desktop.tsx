import { FC } from 'react'
import { Props } from '../ResponsiveSwitcher'
import { Collapse } from '@mui/material'
import { DrawerItems } from '../Common/DrawerItems'

export const Desktop: FC<Props> = ({ isOpen, toggleOpen }) => {
  return (
    <>
      <Collapse in={isOpen} orientation="horizontal" collapsedSize={50}>
        <DrawerItems isOpen={isOpen} toggleOpen={toggleOpen} />
      </Collapse>
    </>
  )
}
