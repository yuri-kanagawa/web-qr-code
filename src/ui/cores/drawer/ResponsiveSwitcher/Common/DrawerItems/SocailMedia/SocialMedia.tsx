import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import SmsIcon from '@mui/icons-material/Sms'
import { useRouter } from 'next/navigation'
import { path } from '@/constants/path'
import Link from 'next/link'
import { FC } from 'react'
import { colors } from '@/constants'
type Props = {
  isOpen: boolean
}
export const SocialMedia: FC<Props> = ({ isOpen }) => {
  return (
    <Link href={path.socialMedia('')} passHref legacyBehavior>
      <ListItem disablePadding sx={{ height: 30 }}>
        <ListItemButton
          sx={{
            height: '100%'
          }}
        >
          <ListItemIcon>
            <SmsIcon />
          </ListItemIcon>
          <ListItemText
            primary={'SOCIAL MEDIA'}
            sx={{
              minWidth: isOpen ? 'auto' : 0, // 非表示時に幅を最小化
              opacity: isOpen ? 1 : 0, // フェード効果
              transition: 'opacity 0.2s ease',
              whiteSpace: 'nowrap', // テキストの折り返しを防ぐ
              overflow: 'hidden' // はみ出し防止
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
