import { FC } from 'react'
import { Props } from '../ResponsiveSwitcher'
import { Backdrop, Collapse, useTheme } from '@mui/material'
import { DrawerItems } from '@/ui/cores/drawer/ResponsiveSwitcher/Common'

export const Mobile: FC<Props> = ({ isOpen, toggleOpen }) => {
  const theme = useTheme()
  return (
    <Collapse in={isOpen} orientation="horizontal" collapsedSize={50}>
      <DrawerItems isOpen={isOpen} toggleOpen={toggleOpen} />
      {/*<Backdrop*/}
      {/*  open={isOpen}*/}
      {/*  sx={{*/}
      {/*    // zIndex: (theme) => theme.zIndex.drawer - 1, // Drawerより後ろに配置*/}
      {/*    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 背景色を暗く*/}
      {/*    position: 'fixed' // 固定位置で全画面に*/}
      {/*    // top: 0,*/}
      {/*    // left: 0,*/}
      {/*    // width: '100%',*/}
      {/*    // height: '100%',*/}
      {/*    // display: 'block' // 背景が表示されているときだけ*/}
      {/*  }}*/}
      {/*  onClick={toggleOpen} // 背景クリックでDrawerを閉じる*/}
      {/*/>*/}
    </Collapse>
  )
}
