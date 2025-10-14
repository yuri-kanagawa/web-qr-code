import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import { word } from '@/locales/en/word'
import { useSidebar } from '@/stores'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { FC } from 'react'

export const OpenButton: FC<Props> = ({}) => {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={toggleSidebar}>
        <ListItemIcon color={'primary'} sx={{ pl: isSidebarOpen ? 1 : 0 }}>
          <NavigateNextIcon
            color="primary"
            style={{
              transition: isSidebarOpen
                ? 'transform 0.2s ease-in-out'
                : 'transform 0.2s ease',
              transform: isSidebarOpen ? 'rotate(0deg)' : 'rotate(-180deg)'
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={isSidebarOpen ? word.sidebar.close : word.sidebar.open}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            opacity: isSidebarOpen ? 1 : 0,
            transition: 'opacity 0.2s ease'
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}
