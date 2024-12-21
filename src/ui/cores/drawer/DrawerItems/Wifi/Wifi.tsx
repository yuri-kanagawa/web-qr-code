import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import WifiIcon from '@mui/icons-material/Wifi'
import { path } from '@/constants/path'
import Link from 'next/link'

export const Wifi = () => {
  return (
    <Link href={path.wifi('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText primary={'Wi-Fi'} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
