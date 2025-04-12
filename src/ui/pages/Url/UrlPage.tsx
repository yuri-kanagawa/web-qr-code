'use client'
import { useUrlQRCodeForm } from '@/ui/pages/Url/_hooks/useUrlQRCodeForm'

import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { Desktop, Mobile } from './_internal'
import { ResponsiveSwitcher } from '@/ui/cores/ResponsiveSwitcher'

import { useQrcode } from '@/hooks'

export const UrlPage = () => {
  const form = useUrlQRCodeForm()

  const desktopOrLaptop = <Desktop {...form} />
  const mobileOrTablet = <Mobile {...form} />

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
