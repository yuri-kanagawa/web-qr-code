import { FC, ReactNode, cloneElement, isValidElement } from 'react'

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

  // アイコンに色を適用
  const iconColor = isCurrentPath
    ? 'rgba(0, 0, 0, 0.87)'
    : 'rgba(0, 0, 0, 0.54)'
  const iconWithColor = isValidElement(icon)
    ? cloneElement(icon as React.ReactElement<any>, {
        style: { color: iconColor },
        color: iconColor
      })
    : icon

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
                width: '6px',
                backgroundColor: 'primary.main',
                borderRadius: '0 4px 4px 0',
                zIndex: 1
              }
            : undefined,
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
              transform: isCurrentPath ? 'scale(1.08)' : 'scale(1)',
              transition:
                'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s'
            }}
          >
            {iconWithColor}
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
