import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import { Language } from '@/domains/valueObjects/language'
import { useSidebar } from '@/stores'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { FC } from 'react'

type Props = {
  language: Language
}

export const OpenButton: FC<Props> = ({ language }) => {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
  const locale = language.locale
  const word = locale.word

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={toggleSidebar}
        sx={{
          minHeight: 40,
          height: 40,
          py: 0,
          px: 2,
          justifyContent: 'flex-start',
          '& .MuiListItemIcon-root': {
            minWidth: 36,
            marginRight: isSidebarOpen ? 2 : 0
          }
        }}
      >
        <ListItemIcon
          sx={{
            justifyContent: 'center',
            color: 'primary.main'
          }}
        >
          <NavigateNextIcon
            sx={{
              transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isSidebarOpen ? 'rotate(0deg)' : 'rotate(-180deg)'
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={isSidebarOpen ? word.sidebar.close : word.sidebar.open}
          sx={{
            m: 0,
            opacity: isSidebarOpen ? 1 : 0,
            transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-8px)',
            transition:
              'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            '& .MuiTypography-root': {
              fontSize: '0.875rem',
              whiteSpace: 'nowrap'
            }
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}
