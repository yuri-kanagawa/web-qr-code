import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { path } from '@/constants/path'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  isOpen: boolean
}

export const Editor: FC<Props> = ({ isOpen }) => {
  return (
    <Link href={path.editor('')} passHref legacyBehavior>
      <ListItem disablePadding sx={{ height: 30 }}>
        <ListItemButton>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Edit'}
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
