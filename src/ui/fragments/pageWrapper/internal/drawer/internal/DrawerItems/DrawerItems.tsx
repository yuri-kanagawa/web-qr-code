import { Language } from '@/domains/valueObjects/language'
import { PathBuilder } from '@/lib/routing'
import { word } from '@/locales/en/word'
import { useSidebar } from '@/stores'
import { DrawerItemIcon } from '@/ui/fragments/pageWrapper/internal/drawer/internal/DrawerItems/DrawerItemIcon/DrawerItemIcon'
import { OpenButton } from '@/ui/fragments/pageWrapper/internal/drawer/internal/DrawerItems/OpenButton/OpenButton'
import { LanguageSelect } from '@/ui/fragments/select'
import LinkIcon from '@mui/icons-material/Link'
import PhoneIcon from '@mui/icons-material/Phone'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import { Box, Collapse, Stack } from '@mui/material'
import { usePathname } from 'next/navigation'
import { forwardRef, useMemo } from 'react'
import { FaCommentSms, FaWifi } from 'react-icons/fa6'
import { MdLocationOn, MdPermContactCalendar } from 'react-icons/md'
import { RiMailFill, RiText } from 'react-icons/ri'

type Props = {
  language: Language
}
export const DrawerItems = forwardRef<HTMLDivElement, Props>(
  ({ language }, ref) => {
    const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
    const pathname = usePathname()
    const pathBuilder = useMemo(() => new PathBuilder(language), [language])

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
              path={pathBuilder.url.index()}
            />
            <DrawerItemIcon
              label={word.navigation.wifi}
              icon={<FaWifi />}
              path={pathBuilder.wifi.index()}
            />
            {/* <DrawerItemIcon
            label={word.navigation.socialMedia}
            icon={<SmsIcon />}
            path={pathBuilder.socialMedia.index()}
          /> */}
            <DrawerItemIcon
              label={word.navigation.device}
              icon={<SmartphoneIcon />}
              path={pathBuilder.device.index()}
            />

            <DrawerItemIcon
              label={word.navigation.contact}
              icon={<MdPermContactCalendar size={24} />}
              path={pathBuilder.contact.index()}
            />
            <DrawerItemIcon
              label={word.navigation.phone}
              icon={<PhoneIcon />}
              path={pathBuilder.phone.index()}
            />
            <DrawerItemIcon
              label={word.navigation.email}
              icon={<RiMailFill size={24} />}
              path={pathBuilder.email.index()}
            />
            <DrawerItemIcon
              label={word.navigation.sms}
              icon={<FaCommentSms />}
              path={pathBuilder.sms.index()}
            />

            <DrawerItemIcon
              label={word.navigation.text}
              icon={<RiText size={24} />}
              path={pathBuilder.text.index()}
            />

            <DrawerItemIcon
              label={word.navigation.map}
              icon={<MdLocationOn size={24} />}
              path={pathBuilder.map.index()}
            />

            <DrawerItemIcon
              label={word.navigation.reader}
              icon={<QrCodeScannerIcon />}
              path={pathBuilder.reader.index()}
            />
            {/* <DrawerItemIcon
            label={word.navigation.edit}
            icon={<EditIcon />}
            path={path.edit.index({ lang: 'en' })}
          /> */}
          </Stack>
          <Stack
            display={'flex'}
            justifyContent={'flex-end'}
            spacing={2}
            pb={2}
          >
            {isSidebarOpen && (
              <Box sx={{ px: 2 }}>
                <LanguageSelect language={language} />
              </Box>
            )}
            <OpenButton />
          </Stack>
        </Stack>
      </Collapse>
    )
  }
)
