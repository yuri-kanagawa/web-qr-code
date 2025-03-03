import List from '@mui/material/List'
import { Url } from '@/ui/cores/drawer/ResponsiveSwitcher/Common/DrawerItems/Url'
import { SocialMedia } from './SocailMedia'
import { Multiple } from './Multiple'
import { Wifi } from '@/ui/cores/drawer/ResponsiveSwitcher/Common/DrawerItems/Wifi'
import { Terminal } from './Terminal'
import { Contact } from './Contact'
import { Sms } from './Sms'
import { Reader } from '@/ui/cores/drawer/ResponsiveSwitcher/Common/DrawerItems/reader'
import { Editor } from './Editor'
import { OpenButton } from '@/ui/cores/drawer/ResponsiveSwitcher/Common/DrawerItems/OpenButton/OpenButton'
import { FC } from 'react'
import { Backdrop } from '@mui/material'
import { DrawerItemIcon } from '@/ui/cores/drawer/ResponsiveSwitcher/Common/DrawerItems/DrawerItemIcon/DrawerItemIcon'
import LinkIcon from '@mui/icons-material/Link'
import { path } from '@/constants/path'
type Props = {
  isOpen: boolean
  toggleOpen: () => void
}
export const DrawerItems: FC<Props> = ({ isOpen, toggleOpen }) => {
  return (
    <List>
      <DrawerItemIcon
        isOpen={isOpen}
        icon={<LinkIcon />}
        path={path.url({ lang: 'en' })}
      />
      <SocialMedia isOpen={isOpen} />
      <Multiple isOpen={isOpen} />
      <Wifi isOpen={isOpen} />

      <Terminal isOpen={isOpen} />
      <Contact isOpen={isOpen} />
      <Sms isOpen={isOpen} />
      <Reader isOpen={isOpen} />
      <Editor isOpen={isOpen} />

      <OpenButton isOpen={isOpen} setIsOpen={toggleOpen} />
    </List>
  )
}
