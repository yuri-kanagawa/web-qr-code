import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'

import { path } from '@/constants/path'
import Link from 'next/link'
export const Contact = () => {
  return (
    <Link href={path.contact('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary={'Contact'} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
