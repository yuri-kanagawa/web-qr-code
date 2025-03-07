import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
import { colors } from '@/constants'
import { path } from '@/config/path'
import Link from 'next/link'
import { FC } from 'react'
import { usePathname, useRouter } from 'next/navigation'
type Props = {
  isOpen: boolean
}

export const Url: FC<Props> = ({ isOpen }) => {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <Link href={path.url({ lang: 'en' })} passHref legacyBehavior>
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            borderLeft: 6,
            borderColor: colors.primary.main,
            height: '100%'
          }}
        >
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText
            primary={'URL'}
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
