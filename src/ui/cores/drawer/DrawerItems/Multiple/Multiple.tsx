import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import { path } from '@/constants/path'
import Link from 'next/link'

export const Multiple = () => {
  return (
    <Link href={path.multiple('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <BookmarksIcon />
          </ListItemIcon>
          <ListItemText primary={'Multiple'} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
