import { describe, it, expect } from 'vitest'
import { GeoLocation } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

describe('GeoLocation', () => {
  const defaultLanguage = Language.default()

  describe('create', () => {
    it('正しい緯度・経度でGeoLocationを作成できる', () => {
      const result = GeoLocation.create(35.68, 139.76, 'Tokyo', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.geoLocation?.latitude).toBe(35.68)
      expect(result.geoLocation?.longitude).toBe(139.76)
      expect(result.geoLocation?.country).toBe('Tokyo')
    })

    it('緯度が最小値（-90）の場合は成功する', () => {
      const result = GeoLocation.create(-90, 0, 'South Pole', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.geoLocation?.latitude).toBe(-90)
    })

    it('緯度が最大値（90）の場合は成功する', () => {
      const result = GeoLocation.create(90, 0, 'North Pole', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.geoLocation?.latitude).toBe(90)
    })

    it('経度が最小値（-180）の場合は成功する', () => {
      const result = GeoLocation.create(0, -180, 'West', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.geoLocation?.longitude).toBe(-180)
    })

    it('経度が最大値（180）の場合は成功する', () => {
      const result = GeoLocation.create(0, 180, 'East', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.geoLocation?.longitude).toBe(180)
    })

    it('緯度が範囲外（-90.1）の場合はエラーを返す', () => {
      const result = GeoLocation.create(-90.1, 0, 'Invalid', defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.error?.message).toContain('-90')
      expect(result.error?.message).toContain('90')
    })

    it('緯度が範囲外（90.1）の場合はエラーを返す', () => {
      const result = GeoLocation.create(90.1, 0, 'Invalid', defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.error).toBeDefined()
    })

    it('経度が範囲外（-180.1）の場合はエラーを返す', () => {
      const result = GeoLocation.create(0, -180.1, 'Invalid', defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.error?.message).toContain('-180')
      expect(result.error?.message).toContain('180')
    })

    it('経度が範囲外（180.1）の場合はエラーを返す', () => {
      const result = GeoLocation.create(0, 180.1, 'Invalid', defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.error).toBeDefined()
    })

    it('日本語でエラーメッセージを返す', () => {
      const japaneseLanguage = Language.create('ja').language!
      const result = GeoLocation.create(100, 0, 'Invalid', japaneseLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.error?.message).toMatch(/緯度/)
    })
  })

  describe('default', () => {
    it('デフォルト位置（東京）を返す', () => {
      const location = GeoLocation.default()

      expect(location.latitude).toBe(35.681236)
      expect(location.longitude).toBe(139.767125)
      expect(location.country).toBe('Japan')
    })
  })

  describe('ファクトリーメソッド', () => {
    it('tokyo()で東京の位置情報を返す', () => {
      const tokyo = GeoLocation.tokyo()

      expect(tokyo.latitude).toBe(35.681236)
      expect(tokyo.longitude).toBe(139.767125)
      expect(tokyo.country).toMatch(/Japan|日本/)
    })

    it('newYork()でニューヨークの位置情報を返す', () => {
      const newYork = GeoLocation.newYork()

      expect(newYork.latitude).toBe(40.712776)
      expect(newYork.longitude).toBe(-74.005974)
      expect(newYork.country).toMatch(/United States|アメリカ/)
    })

    it('paris()でパリの位置情報を返す', () => {
      const paris = GeoLocation.paris()

      expect(paris.latitude).toBe(48.856613)
      expect(paris.longitude).toBe(2.352222)
      expect(paris.country).toBe('France')
    })
  })

  describe('distanceTo', () => {
    it('2点間の距離を正しく計算する', () => {
      const tokyo = GeoLocation.tokyo()
      const newYork = GeoLocation.newYork()

      const distance = tokyo.distanceTo(newYork)

      // 東京-ニューヨークは約10,850km
      expect(distance).toBeGreaterThan(10000)
      expect(distance).toBeLessThan(11000)
    })

    it('同じ地点間の距離は0km', () => {
      const tokyo1 = GeoLocation.tokyo()
      const tokyo2 = GeoLocation.tokyo()

      const distance = tokyo1.distanceTo(tokyo2)

      expect(distance).toBe(0)
    })

    it('近い地点間の距離を正しく計算する', () => {
      const result1 = GeoLocation.create(35.68, 139.76, 'A', defaultLanguage)
      const result2 = GeoLocation.create(35.69, 139.77, 'B', defaultLanguage)

      const distance = result1.geoLocation!.distanceTo(result2.geoLocation!)

      // 約1.5km
      expect(distance).toBeGreaterThan(1)
      expect(distance).toBeLessThan(2)
    })
  })

  describe('googleMapsUrl', () => {
    it('Google Maps URLを生成する', () => {
      const tokyo = GeoLocation.tokyo()

      const url = tokyo.googleMapsUrl

      expect(url).toBe('https://www.google.com/maps?q=35.681236,139.767125')
      expect(url).toContain('google.com/maps')
      expect(url).toContain('35.681236')
      expect(url).toContain('139.767125')
    })
  })

  describe('toString', () => {
    it('座標を文字列で表現する', () => {
      const tokyo = GeoLocation.tokyo()

      const str = tokyo.toString()

      expect(str).toBe('35.681236,139.767125')
    })
  })

  describe('equals', () => {
    it('同じ座標の場合はtrueを返す', () => {
      const tokyo1 = GeoLocation.tokyo()
      const tokyo2 = GeoLocation.tokyo()

      expect(tokyo1.equals(tokyo2)).toBe(true)
    })

    it('異なる座標の場合はfalseを返す', () => {
      const tokyo = GeoLocation.tokyo()
      const newYork = GeoLocation.newYork()

      expect(tokyo.equals(newYork)).toBe(false)
    })
  })
})
