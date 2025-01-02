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
import { FC } from 'react'
type Props = {
  isOpen: boolean
}

export const Url: FC<Props> = ({ isOpen }) => {
  return (
    <Link href={path.url('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton
          sx={{ borderLeft: 6, borderColor: colors.primary.main }}
        >
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          {isOpen && <ListItemText primary={'URL'} />}
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
