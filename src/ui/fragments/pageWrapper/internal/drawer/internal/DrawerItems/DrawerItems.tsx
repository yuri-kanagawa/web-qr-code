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

export const DrawerItems = forwardRef<HTMLDivElement, Props>(({}, ref) => {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
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
            label={'URL'}
            icon={<LinkIcon />}
            path={path.url.index({ lang: 'en' })}
          />
          <DrawerItemIcon
            label={'Wi-Fi'}
            icon={<FaWifi />}
            path={path.wifi.index({ lang: 'en' })}
          />
          {/* <DrawerItemIcon
            label={'SOCIAL MEDIA'}
            icon={<SmsIcon />}
            path={path.socialMedia.index({ lang: 'en' })}
          /> */}
          <DrawerItemIcon
            label={'DEVICE'}
            icon={<SmartphoneIcon />}
            path={path.device.index({ lang: 'en' })}
          />

          <DrawerItemIcon
            label={'CONTACT'}
            icon={<MdPermContactCalendar size={24} />}
            path={path.contact.index({ lang: 'en' })}
          />
          <DrawerItemIcon
            label={'PHONE'}
            icon={<PhoneIcon />}
            path={path.phone.index({ lang: 'en' })}
          />
          <DrawerItemIcon
            label={'EMAIL'}
            icon={<RiMailFill size={24} />}
            path={path.email.index({ lang: 'en' })}
          />
          <DrawerItemIcon
            label={'SMS'}
            icon={<FaCommentSms />}
            path={path.sms.index({ lang: 'en' })}
          />

          <DrawerItemIcon
            label={'Text'}
            icon={<RiText size={24} />}
            path={path.text.index({ lang: 'en' })}
          />

          <DrawerItemIcon
            label={'READER'}
            icon={<QrCodeScannerIcon />}
            path={path.reader.index({ lang: 'en' })}
          />
          {/* <DrawerItemIcon
            label={'EDIT'}
            icon={<EditIcon />}
            path={path.edit.index({ lang: 'en' })}
          /> */}
        </Stack>
        <Stack display={'flex'} justifyContent={'flex-end'}>
          <OpenButton />
        </Stack>
      </Stack>
    </Collapse>
  )
})
