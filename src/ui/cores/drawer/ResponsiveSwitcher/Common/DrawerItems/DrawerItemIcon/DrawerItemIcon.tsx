import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { path } from '@/config/path'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import { usePathname } from 'next/navigation'
import { colors } from '@/constants'
import { auto } from '@popperjs/core'

type Props = {
  isOpen: boolean
  icon: ReactNode
  path: string
  label: string
}

export const DrawerItemIcon: FC<Props> = ({ isOpen, icon, path, label }) => {
  const pathname = usePathname()
  const isCurrentPath = pathname === path
  return (
    <Link href={path} passHref legacyBehavior>
      <ListItem
        disablePadding
        sx={{
          borderLeft: 6,
          borderColor: isCurrentPath ? colors.primary.main : 'white',
          height: '100%',
          background: isCurrentPath ? '#E0E0E0' : 'white'
        }}
      >
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            primary={label}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 0.2s ease'
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
