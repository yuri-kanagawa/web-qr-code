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
          {isOpen && <ListItemText primary={'Sms'} />}
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
