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
import { path } from '@/config/path'
import SmsIcon from '@mui/icons-material/Sms'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import { SlEnvolopeLetter } from 'react-icons/sl'
import { IoIosMail } from 'react-icons/io'
type Props = {
  isOpen: boolean
  toggleOpen: () => void
}
export const DrawerItems: FC<Props> = ({ isOpen, toggleOpen }) => {
  return (
    <List>
      <DrawerItemIcon
        isOpen={isOpen}
        label={'CONTACT'}
        icon={<LinkIcon />}
        path={path.url.index({ lang: 'en' })}
      />
      <DrawerItemIcon
        isOpen={isOpen}
        label={'SOCIAL MEDIA'}
        icon={<SmsIcon />}
        path={path.socialMedia.index({ lang: 'en' })}
      />

      <Multiple isOpen={isOpen} />
      <Wifi isOpen={isOpen} />
      <DrawerItemIcon
        isOpen={isOpen}
        label={'TERMINAL'}
        icon={<SmartphoneIcon />}
        path={path.terminal.index({ lang: 'en' })}
      />
      <Terminal isOpen={isOpen} />
      <Contact isOpen={isOpen} />
      <Sms isOpen={isOpen} />
      <DrawerItemIcon
        isOpen={isOpen}
        label={'Text'}
        icon={<IoIosMail size={24} />}
        path={path.text.index({ lang: 'en' })}
      />

      <Reader isOpen={isOpen} />
      <Editor isOpen={isOpen} />

      <OpenButton isOpen={isOpen} setIsOpen={toggleOpen} />
    </List>
  )
}
