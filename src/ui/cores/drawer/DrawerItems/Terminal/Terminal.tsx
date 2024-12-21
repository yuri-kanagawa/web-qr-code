import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import { path } from '@/constants/path'
import Link from 'next/link'

export const Terminal = () => {
  return (
    <Link href={path.terminal('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <SmartphoneIcon />
          </ListItemIcon>
          <ListItemText primary={'Terminal'} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
