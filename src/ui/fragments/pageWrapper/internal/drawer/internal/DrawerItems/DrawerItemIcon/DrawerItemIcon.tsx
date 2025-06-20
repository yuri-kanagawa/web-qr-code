import { FC, ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import { colors } from '@/constants'
import { useSidebar } from '@/stores'
import {
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@/ui/cores'

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
