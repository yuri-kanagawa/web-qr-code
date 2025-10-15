import { describe, it, expect, vi, beforeEach } from 'vitest'
import { IpApiGeoLocationRepository } from './IpApiGeoLocationRepository'
import { Language } from '@/domains/valueObjects/language'
import { GeoLocation } from '@/domains/valueObjects/geoLocation'

// fetchをモック
global.fetch = vi.fn()

describe('IpApiGeoLocationRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getCurrentLocation', () => {
    it('APIから位置情報を正しく取得できる', async () => {
      // fetchのモック
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          latitude: 35.68,
          longitude: 139.76,
          country_name: 'Japan'
        })
      })

      const repository = new IpApiGeoLocationRepository(Language.default())
      const location = await repository.getCurrentLocation()

      expect(location.latitude).toBe(35.68)
      expect(location.longitude).toBe(139.76)
      expect(location.country).toBe('Japan')
    })

    it('APIから米国の位置情報を取得できる', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          latitude: 40.71,
          longitude: -74.00,
          country_name: 'United States'
        })
      })

      const repository = new IpApiGeoLocationRepository(Language.default())
      const location = await repository.getCurrentLocation()

      expect(location.latitude).toBe(40.71)
      expect(location.longitude).toBe(-74.00)
      expect(location.country).toBe('United States')
    })

    it('日本語で国名を翻訳する', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          latitude: 35.68,
          longitude: 139.76,
          country_name: 'Japan'
        })
      })

      const japaneseLanguage = Language.create('ja').language!
      const repository = new IpApiGeoLocationRepository(japaneseLanguage)
      const location = await repository.getCurrentLocation()

      expect(location.country).toBe('日本')
    })

    it('APIエラー時はデフォルト位置を返す', async () => {
      // fetchが失敗
      ;(global.fetch as any).mockRejectedValueOnce(new Error('Network error'))

      const repository = new IpApiGeoLocationRepository(Language.default())
      const location = await repository.getCurrentLocation()

      // デフォルト位置（東京）が返る
      const defaultLocation = GeoLocation.default()
      expect(location.latitude).toBe(defaultLocation.latitude)
      expect(location.longitude).toBe(defaultLocation.longitude)
    })

    it('HTTPステータスエラー時はデフォルト位置を返す', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500
      })

      const repository = new IpApiGeoLocationRepository(Language.default())
      const location = await repository.getCurrentLocation()

      const defaultLocation = GeoLocation.default()
      expect(location.latitude).toBe(defaultLocation.latitude)
    })

    it('無効なデータの場合はデフォルト位置を返す', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          latitude: null,
          longitude: null
        })
      })

      const repository = new IpApiGeoLocationRepository(Language.default())
      const location = await repository.getCurrentLocation()

      const defaultLocation = GeoLocation.default()
      expect(location.latitude).toBe(defaultLocation.latitude)
    })

    it('NaN値の場合はデフォルト位置を返す', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          latitude: 'invalid',
          longitude: 'invalid'
        })
      })

      const repository = new IpApiGeoLocationRepository(Language.default())
      const location = await repository.getCurrentLocation()

      const defaultLocation = GeoLocation.default()
      expect(location.latitude).toBe(defaultLocation.latitude)
    })

    it('範囲外の座標の場合はデフォルト位置を返す', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          latitude: 100, // 範囲外
          longitude: 200, // 範囲外
          country_name: 'Invalid'
        })
      })

      const repository = new IpApiGeoLocationRepository(Language.default())
      const location = await repository.getCurrentLocation()

      const defaultLocation = GeoLocation.default()
      expect(location.latitude).toBe(defaultLocation.latitude)
    })

    it('正しいAPIエンドポイントを呼び出す', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          latitude: 35.68,
          longitude: 139.76,
          country_name: 'Japan'
        })
      })

      const repository = new IpApiGeoLocationRepository(Language.default())
      await repository.getCurrentLocation()

      expect(global.fetch).toHaveBeenCalledWith('https://ipapi.co/json/')
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('国名翻訳', () => {
    it('主要国の国名を日本語に翻訳する', async () => {
      const countries = [
        { en: 'United States', ja: 'アメリカ' },
        { en: 'United Kingdom', ja: 'イギリス' },
        { en: 'France', ja: 'フランス' },
        { en: 'Germany', ja: 'ドイツ' },
        { en: 'China', ja: '中国' },
        { en: 'South Korea', ja: '韓国' }
      ]

      const japaneseLanguage = Language.create('ja').language!
      const repository = new IpApiGeoLocationRepository(japaneseLanguage)

      for (const country of countries) {
        ;(global.fetch as any).mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            latitude: 35.68,
            longitude: 139.76,
            country_name: country.en
          })
        })

        const location = await repository.getCurrentLocation()
        expect(location.country).toBe(country.ja)
      }
    })

    it('翻訳がない国名はそのまま返す', async () => {
      vi.clearAllMocks()
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          latitude: 35.68,
          longitude: 139.76,
          country_name: 'Unknown Country'
        })
      })

      const japaneseLanguage = Language.create('ja').language!
      const repository = new IpApiGeoLocationRepository(japaneseLanguage)
      const location = await repository.getCurrentLocation()

      expect(location.country).toBe('Unknown Country')
    })
  })
})

