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
          <ListItemText
            primary={'CONTACT'}
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
