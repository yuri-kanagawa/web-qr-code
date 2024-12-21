import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import { path } from '@/constants/path'
import Link from 'next/link'

export const Reader = () => {
  return (
    <Link href={path.reader('')} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <QrCodeScannerIcon />
          </ListItemIcon>
          <ListItemText primary={'Reader'} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
