import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import { path } from '@/constants/path'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  isOpen: boolean
}

export const Terminal: FC<Props> = ({ isOpen }) => {
  return (
    <Link href={path.terminal('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <SmartphoneIcon />
          </ListItemIcon>
          <ListItemText
            primary={'TERMINAL'}
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
