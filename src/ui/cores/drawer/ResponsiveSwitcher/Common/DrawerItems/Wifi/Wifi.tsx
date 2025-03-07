import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import WifiIcon from '@mui/icons-material/Wifi'
import { path } from '@/config/path'
import Link from 'next/link'
import { FC } from 'react'
type Props = {
  isOpen: boolean
}
export const Wifi: FC<Props> = ({ isOpen }) => {
  return (
    <Link href={path.wifi('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText primary={isOpen ? 'Wi-Fi' : undefined} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
