import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { path } from '@/constants/path'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import { usePathname } from 'next/navigation'
import { colors } from '@/constants'

type Props = {
  isOpen: boolean
  icon: ReactNode
  path: string
}

export const DrawerItemIcon: FC<Props> = ({ isOpen, icon, path }) => {
  const pathname = usePathname()
  const isCurrentPath = pathname === path
  return (
    <Link href={path} passHref legacyBehavior>
      <ListItem
        disablePadding
        sx={{
          borderLeft: 6,
          borderColor: isCurrentPath ? colors.primary.main : 'white',
          height: '100%'
        }}
      >
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
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
