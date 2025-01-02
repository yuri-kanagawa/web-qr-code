import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'

import { path } from '@/constants/path'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  isOpen: boolean
}

export const Contact: FC<Props> = ({ isOpen }) => {
  return (
    <Link href={path.contact('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          {isOpen && <ListItemText primary={'Contact'} />}
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
