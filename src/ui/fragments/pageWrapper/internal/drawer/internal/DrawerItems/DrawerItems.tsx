import List from '@mui/material/List'

import { OpenButton } from '@/ui/fragments/pageWrapper/internal/drawer/internal/DrawerItems/OpenButton/OpenButton'
import React, { FC, forwardRef } from 'react'
import { Backdrop, Box, Collapse, ListItem, Stack } from '@mui/material'
import { DrawerItemIcon } from '@/ui/fragments/pageWrapper/internal/drawer/internal/DrawerItems/DrawerItemIcon/DrawerItemIcon'
import LinkIcon from '@mui/icons-material/Link'
import { path } from '@/config/path'
import SmsIcon from '@mui/icons-material/Sms'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import { SlEnvolopeLetter } from 'react-icons/sl'
import { IoIosMail } from 'react-icons/io'
import EditIcon from '@mui/icons-material/Edit'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import PhoneIcon from '@mui/icons-material/Phone'
import { useSidebar } from '@/stores'
import { MdPermContactCalendar } from 'react-icons/md'
import { RiMailFill, RiText } from 'react-icons/ri'
import { FaCommentSms, FaWifi } from 'react-icons/fa6'
import { MdLocationOn } from 'react-icons/md'
import { LanguageSelect } from '@/ui/fragments/select'
import { usePathname } from 'next/navigation'
import { LanguageKey } from '@/locales/language'
import { word } from '@/locales/en/word'

// パスから言語を抽出する関数
const getCurrentLanguage = (pathname: string): LanguageKey => {
  const segments = pathname.split('/')
  const firstSegment = segments[1]

  if (firstSegment === 'ja' || firstSegment === 'fr') {
    return firstSegment
  }
  return 'en'
}

export const DrawerItems = forwardRef<HTMLDivElement, Props>(({}, ref) => {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
  const pathname = usePathname()
  const currentLanguage = getCurrentLanguage(pathname)

  return (
    <Collapse in={isSidebarOpen} orientation="horizontal" collapsedSize={70}>
      <Stack
        ref={ref}
        sx={{
          overflow: 'auto',
          display: 'flex',
          height: '100vh',
          justifyContent: 'space-between',
          width: isSidebarOpen ? 210 : 70
        }}
      >
        <Stack spacing={0} width={'100%'}>
          <DrawerItemIcon
            label={word.navigation.url}
            icon={<LinkIcon />}
            path={path.url.index({ lang: 'en' })}
          />
          <DrawerItemIcon
            label={word.navigation.wifi}
            icon={<FaWifi />}
            path={path.wifi.index({ lang: 'en' })}
          />
          {/* <DrawerItemIcon
            label={word.navigation.socialMedia}
            icon={<SmsIcon />}
            path={path.socialMedia.index({ lang: 'en' })}
          /> */}
          <DrawerItemIcon
            label={word.navigation.device}
            icon={<SmartphoneIcon />}
            path={path.device.index({ lang: 'en' })}
          />

          <DrawerItemIcon
            label={word.navigation.contact}
            icon={<MdPermContactCalendar size={24} />}
            path={path.contact.index({ lang: 'en' })}
          />
          <DrawerItemIcon
            label={word.navigation.phone}
            icon={<PhoneIcon />}
            path={path.phone.index({ lang: 'en' })}
          />
          <DrawerItemIcon
            label={word.navigation.email}
            icon={<RiMailFill size={24} />}
            path={path.email.index({ lang: 'en' })}
          />
          <DrawerItemIcon
            label={word.navigation.sms}
            icon={<FaCommentSms />}
            path={path.sms.index({ lang: 'en' })}
          />

          <DrawerItemIcon
            label={word.navigation.text}
            icon={<RiText size={24} />}
            path={path.text.index({ lang: 'en' })}
          />

          <DrawerItemIcon
            label={word.navigation.map}
            icon={<MdLocationOn size={24} />}
            path={path.map.index({ lang: 'en' })}
          />

          <DrawerItemIcon
            label={word.navigation.reader}
            icon={<QrCodeScannerIcon />}
            path={path.reader.index({ lang: 'en' })}
          />
          {/* <DrawerItemIcon
            label={word.navigation.edit}
            icon={<EditIcon />}
            path={path.edit.index({ lang: 'en' })}
          /> */}
        </Stack>
        <Stack display={'flex'} justifyContent={'flex-end'} spacing={2} pb={2}>
          {isSidebarOpen && (
            <Box sx={{ px: 2 }}>
              <LanguageSelect currentLanguage={currentLanguage} />
            </Box>
          )}
          <OpenButton />
        </Stack>
      </Stack>
    </Collapse>
  )
})
