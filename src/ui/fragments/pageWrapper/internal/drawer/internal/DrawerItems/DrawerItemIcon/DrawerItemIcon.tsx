import { FC, ReactNode } from 'react'

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
          position: 'relative',
          '&::before': isCurrentPath
            ? {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: '4px',
                backgroundColor: 'primary.main',
                zIndex: 1
              }
            : undefined,
          bgcolor: isCurrentPath ? 'action.selected' : undefined,
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
      >
        <ListItemButton
          sx={{
            minHeight: 40,
            height: 40,
            py: 0,
            px: 2, // パディングを常に一定に
            justifyContent: 'flex-start', // 常に左寄せに
            '& .MuiListItemIcon-root': {
              minWidth: 36, // アイコンの最小幅を常に一定に
              marginRight: isSidebarOpen ? 2 : 0 // テキストとの間隔のみ可変
            }
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: 'center',
              color: isCurrentPath ? 'primary.main' : 'inherit'
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={label}
            sx={{
              m: 0,
              opacity: isSidebarOpen ? 1 : 0,
              transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-8px)',
              transition:
                'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              '& .MuiTypography-root': {
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                fontWeight: isCurrentPath ? 600 : 400
              }
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
