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
  const locale = language.getLocale()
  const word = locale.word

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
