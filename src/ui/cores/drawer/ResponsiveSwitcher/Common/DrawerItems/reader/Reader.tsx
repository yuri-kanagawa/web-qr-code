import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import { path } from '@/constants/path'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  isOpen: boolean
}
export const Reader: FC<Props> = ({ isOpen }) => {
  return (
    <Link href={path.reader('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <QrCodeScannerIcon />
          </ListItemIcon>
          <ListItemText
            primary={'READER'}
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
