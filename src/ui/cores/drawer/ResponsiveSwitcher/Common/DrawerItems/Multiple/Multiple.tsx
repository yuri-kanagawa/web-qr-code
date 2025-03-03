import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import { path } from '@/constants/path'
import Link from 'next/link'
import { FC } from 'react'
type Props = {
  isOpen: boolean
}
export const Multiple: FC<Props> = ({ isOpen }) => {
  return (
    <Link href={path.multiple('')} passHref legacyBehavior>
      <ListItem disablePadding sx={{ height: 30 }}>
        <ListItemButton>
          <ListItemIcon>
            <BookmarksIcon />
          </ListItemIcon>
          <ListItemText
            primary={'MULTIPLE'}
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
