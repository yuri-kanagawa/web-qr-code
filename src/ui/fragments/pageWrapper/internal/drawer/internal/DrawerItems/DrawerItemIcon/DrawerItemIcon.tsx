import { FC, ReactNode } from 'react'

import { themeColors } from '@/config/theme'
import { useSidebar } from '@/stores'
import {
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@/ui/cores'
import { usePathname } from 'next/navigation'

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
          width: '100%',
          height: '100%',
          background: isCurrentPath ? '#E0E0E0' : undefined
        }}
      >
        <ListItemButton
          sx={{
            position: 'relative',
            '&::before': isCurrentPath
              ? {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: '6px',
                  backgroundColor: themeColors.primary.main
                }
              : {}
          }}
        >
          <ListItemIcon sx={{ pl: 1 }}>{icon}</ListItemIcon>
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
