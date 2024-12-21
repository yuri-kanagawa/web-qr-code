import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import SmsIcon from '@mui/icons-material/Sms'
import { useRouter } from 'next/navigation'
import { path } from '@/constants/path'
import Link from 'next/link'

export const Sms = () => {
  return (
    <Link href={path.sms('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <SmsIcon />
          </ListItemIcon>
          <ListItemText primary={'Sms'} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
