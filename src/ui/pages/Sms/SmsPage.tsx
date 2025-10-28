'use client'
import { FC, useEffect, useState } from 'react'

import { DetectCountryUseCase } from '@/application/usecases'
import { Country, QrCode } from '@/domains'
import { SmsForm } from '@/features/qr-code'
import { GeoLocationRepository } from '@/infrastructure/repositories/external/geoLocation/GeoLocationRepository'
import { PageWrapper } from '@/ui/fragments'

interface Props {
  qr: QrCode
}

export const SmsPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToSms())
  const [detectedCountry, setDetectedCountry] = useState<Country | null>(null)

  // 国を検出
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const geoLocationRepository = new GeoLocationRepository(
          currentQr.language
        )
        const detectCountryUseCase = new DetectCountryUseCase(
          geoLocationRepository,
          currentQr.language
        )
        const country = await detectCountryUseCase.execute()
        setDetectedCountry(country)
      } catch (error) {
        console.error('国検出エラー:', error)
        setDetectedCountry(null)
      }
    }

    detectCountry()
  }, [currentQr.language])

  return (
    <PageWrapper language={currentQr.language}>
      <SmsForm
        qr={currentQr}
        onChange={setCurrentQr}
        detectedCountry={detectedCountry}
      />
    </PageWrapper>
  )
}
