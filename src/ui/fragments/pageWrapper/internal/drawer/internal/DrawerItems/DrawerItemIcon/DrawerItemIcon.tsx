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
import { useSidebar } from '@/stores'

type Props = {
  icon: ReactNode
  path: string
  label: string
}

export const DrawerItemIcon: FC<Props> = ({ icon, path, label }) => {
  const pathname = usePathname()
  const isCurrentPath = pathname === path
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
  return (
    <Link href={path} passHref legacyBehavior>
      <ListItem
        disablePadding
        sx={{
          borderLeft: isCurrentPath ? 6 : 0,
          borderColor: isCurrentPath ? colors.primary.main : undefined,
          height: '100%',
          background: isCurrentPath ? '#E0E0E0' : undefined
        }}
      >
        <ListItemButton>
          <ListItemIcon sx={{ pl: isCurrentPath ? 0 : 1 }}>{icon}</ListItemIcon>
          <ListItemText
            primary={label}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              opacity: isSidebarOpen ? 1 : 0,
              transition: 'opacity 0.2s ease'
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
