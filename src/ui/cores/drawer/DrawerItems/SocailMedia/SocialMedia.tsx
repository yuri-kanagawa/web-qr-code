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

export const SocialMedia = () => {
  return (
    <Link href={path.socialMedia('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <SmsIcon />
          </ListItemIcon>
          <ListItemText primary={'SocialMedia'} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
