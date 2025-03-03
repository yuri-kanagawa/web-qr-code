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
export const Sms: FC<Props> = ({ isOpen }) => {
  return (
    <Link href={path.sms('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <SmsIcon />
          </ListItemIcon>
          <ListItemText
            primary={'SMS'}
            sx={{
              visibility: isOpen ? 'visible' : 'hidden',
              width: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 0.2s ease'
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
