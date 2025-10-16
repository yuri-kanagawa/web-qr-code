import { Language } from '@/domains/valueObjects/language'
import { PathBuilder } from '@/lib/routing'
import { useSidebar } from '@/stores'
import { DrawerItemIcon } from '@/ui/fragments/pageWrapper/internal/drawer/internal/DrawerItems/DrawerItemIcon/DrawerItemIcon'
import { OpenButton } from '@/ui/fragments/pageWrapper/internal/drawer/internal/DrawerItems/OpenButton/OpenButton'
import { LanguageSelect } from '@/ui/fragments/select'
import LinkIcon from '@mui/icons-material/Link'
import PhoneIcon from '@mui/icons-material/Phone'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import { Box, Stack } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
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
    const router = useRouter()
    const pathname = usePathname()
    const pathBuilder = useMemo(() => new PathBuilder(language), [language])
    const locale = language.locale
    const word = locale.word

    const handleLanguageChange = (newLanguage: Language) => {
      const currentPath = pathname
      let newPath = currentPath

      // 現在のパスから言語プレフィックスを除去
      if (!language.isEnglish) {
        newPath = currentPath.replace(`/${language.value}`, '')
      }

      // 新しい言語のパスを構築
      if (!newLanguage.isEnglish) {
        newPath = `/${newLanguage.value}${newPath}`
      }

      router.push(newPath)
    }

    return (
      <Stack
        ref={ref}
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'space-between',
          width: '100%',
          position: 'relative',
          transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Stack
          spacing={0}
          sx={{
            width: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            flexGrow: 1,
            '&::-webkit-scrollbar': {
              width: '4px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'grey.300',
              borderRadius: '2px'
            }
          }}
        >
          <DrawerItemIcon
            label={word.navigation.url}
            icon={<LinkIcon sx={{ fontSize: 24 }} />}
            path={pathBuilder.url.index}
          />
          <DrawerItemIcon
            label={word.navigation.wifi}
            icon={<FaWifi size={24} />}
            path={pathBuilder.wifi.index}
          />
          {/* <DrawerItemIcon
            label={word.navigation.socialMedia}
            icon={<SmsIcon />}
            path={pathBuilder.socialMedia.index}
          /> */}
          <DrawerItemIcon
            label={word.navigation.device}
            icon={<SmartphoneIcon sx={{ fontSize: 24 }} />}
            path={pathBuilder.device.index}
          />

          <DrawerItemIcon
            label={word.navigation.contact}
            icon={<MdPermContactCalendar size={24} />}
            path={pathBuilder.contact.index}
          />
          <DrawerItemIcon
            label={word.navigation.phone}
            icon={<PhoneIcon sx={{ fontSize: 24 }} />}
            path={pathBuilder.phone.index()}
          />
          <DrawerItemIcon
            label={word.navigation.email}
            icon={<RiMailFill size={24} />}
            path={pathBuilder.email.index}
          />
          <DrawerItemIcon
            label={word.navigation.sms}
            icon={<FaCommentSms size={24} />}
            path={pathBuilder.sms.index()}
          />

          <DrawerItemIcon
            label={word.navigation.text}
            icon={<RiText size={24} />}
            path={pathBuilder.text.index}
          />

          <DrawerItemIcon
            label={word.navigation.map}
            icon={<MdLocationOn size={24} />}
            path={pathBuilder.map.index}
          />

          <DrawerItemIcon
            label={word.navigation.reader}
            icon={<QrCodeScannerIcon sx={{ fontSize: 24 }} />}
            path={pathBuilder.reader.index}
          />
          {/* <DrawerItemIcon
            label={word.navigation.edit}
            icon={<EditIcon />}
            path={path.edit.index({ lang: 'en' })}
          /> */}
        </Stack>
        <Stack display={'flex'} justifyContent={'flex-end'} spacing={2} pb={2}>
          <Box
            sx={{
              px: isSidebarOpen ? 1 : 0,
              display: isSidebarOpen ? 'block' : 'flex',
              justifyContent: isSidebarOpen ? undefined : 'center'
            }}
          >
            <LanguageSelect
              language={language}
              onChange={handleLanguageChange}
              isSidebarOpen={isSidebarOpen}
            />
          </Box>
          <OpenButton language={language} />
        </Stack>
      </Stack>
    )
  }
)
