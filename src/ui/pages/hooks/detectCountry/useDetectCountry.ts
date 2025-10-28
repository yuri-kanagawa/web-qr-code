import { DetectCountryUseCase } from '@/application/usecases'
import { Language } from '@/domains/valueObjects/language'
import { GeoLocationRepository } from '@/infrastructure/repositories/external/geoLocation/GeoLocationRepository'
import useSWR from 'swr'

export const useDetectCountry = (language: Language) => {
  const { data, error, isLoading } = useSWR(
    `detect-country-${language.value}`,
    async () => {
      const geoLocationRepository = new GeoLocationRepository(language)
      const detectCountryUseCase = new DetectCountryUseCase(
        geoLocationRepository,
        language
      )
      return await detectCountryUseCase.execute()
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000 // 1分間キャッシュ
    }
  )

  return {
    detectedCountry: data || null,
    isLoading,
    error
  }
}
