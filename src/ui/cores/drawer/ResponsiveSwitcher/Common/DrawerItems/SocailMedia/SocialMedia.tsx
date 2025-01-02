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
import { FC } from 'react'
type Props = {
  isOpen: boolean
}
export const SocialMedia: FC<Props> = ({ isOpen }) => {
  return (
    <Link href={path.socialMedia('')} passHref legacyBehavior>
      <ListItem
        disablePadding
        // sx={{ pl: 0.5 }}
      >
        <ListItemButton>
          <ListItemIcon>
            <SmsIcon />
          </ListItemIcon>
          {isOpen && <ListItemText primary={'SocialMedia'} />}
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
