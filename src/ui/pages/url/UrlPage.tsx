'use client'
import { useUrlQRCodeForm } from '@/ui/pages/url/_hooks/useUrlQRCodeForm'

import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { Desktop, Mobile } from './_internal'
import { ResponsiveSwitcher } from '@/ui/cores/ResponsiveSwitcher'

import { useQrcode } from '@/hooks'

export const UrlPage = () => {
  const { control } = useUrlQRCodeForm()
  const { file, setFile } = useQrcode()
  const props = {
    control,
    file,
    setFile
  }
  const desktopOrLaptop = <Desktop {...props} />
  const mobileOrTablet = <Mobile {...props} />

  return (
    <PageWrapper>
      <ResponsiveSwitcher
        desktop={desktopOrLaptop}
        laptop={desktopOrLaptop}
        mobile={mobileOrTablet}
        tablet={mobileOrTablet}
      />
    </PageWrapper>
  )
}
