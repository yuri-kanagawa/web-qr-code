import List from '@mui/material/List'
import { Url } from '@/ui/cores/drawer/DrawerItems/Url'
import { SocialMedia } from './SocailMedia'
import { Multiple } from './Multiple'
import { Wifi } from '@/ui/cores/drawer/DrawerItems/Wifi'
import { Terminal } from './Terminal'
import { Contact } from './Contact'
import { Sms } from './Sms'
import { Reader } from '@/ui/cores/drawer/DrawerItems/reader'
import { Editor } from './Editor'
import { OpenButton } from '@/ui/cores/drawer/DrawerItems/OpenButton/OpenButton'
import { FC } from 'react'
type Props = {
  isOpen: boolean
  setIsOpen: () => void
}
export const DrawerItems: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <List>
      <Url />
      <SocialMedia />
      <Multiple />
      <Wifi />

      <Terminal />
      <Contact />
      <Sms />
      <Reader />
      <Editor />
      <OpenButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </List>
  )
}
