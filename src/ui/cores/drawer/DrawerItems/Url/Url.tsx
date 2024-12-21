import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
import { colors } from '@/constants'
import { path } from '@/constants/path'
import Link from 'next/link'

export const Url = () => {
  return (
    <Link href={path.url('')} passHref legacyBehavior>
      <ListItem disablePadding sx={{ background: colors.primary.light }}>
        <ListItemButton
          sx={{ borderLeft: 6, borderColor: colors.primary.main }}
        >
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary={'URL'} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
