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
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <BookmarksIcon />
          </ListItemIcon>
          <ListItemText primary={isOpen ? 'Multiple' : undefined} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
