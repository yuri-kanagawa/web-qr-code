import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { path } from '@/constants/path'
import Link from 'next/link'
export const Editor = () => {
  return (
    <Link href={path.editor('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={'Edit'} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
