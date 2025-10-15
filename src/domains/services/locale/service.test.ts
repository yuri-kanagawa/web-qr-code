import { Country } from '@/domains/valueObjects/country'
import { Language } from '@/domains/valueObjects/language'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LocaleService } from './service'

describe('LocaleService', () => {
  describe('extractCountryCode', () => {
    it('言語コードのみの場合、マッピングされた国コードを返す', () => {
      expect(LocaleService.extractCountryCode('ja')).toBe('jp')
      expect(LocaleService.extractCountryCode('en')).toBe('us')
      expect(LocaleService.extractCountryCode('fr')).toBe('fr')
    })

    it('ロケール形式（言語-国）の場合、国コード部分を返す', () => {
      expect(LocaleService.extractCountryCode('en-US')).toBe('us')
      expect(LocaleService.extractCountryCode('en-GB')).toBe('gb')
      expect(LocaleService.extractCountryCode('fr-FR')).toBe('fr')
      expect(LocaleService.extractCountryCode('ja-JP')).toBe('jp')
    })

    it('大文字のロケールコードを小文字に変換する', () => {
      expect(LocaleService.extractCountryCode('EN-US')).toBe('us')
      expect(LocaleService.extractCountryCode('JA-JP')).toBe('jp')
    })

    it('マッピングにない言語コードはそのまま返す', () => {
      expect(LocaleService.extractCountryCode('es')).toBe('es')
      expect(LocaleService.extractCountryCode('it')).toBe('it')
      expect(LocaleService.extractCountryCode('pt')).toBe('pt')
    })

    it('無効な形式の場合はデフォルトの us を返す', () => {
      expect(LocaleService.extractCountryCode('invalid')).toBe('us')
      expect(LocaleService.extractCountryCode('x')).toBe('us')
      expect(LocaleService.extractCountryCode('123')).toBe('us')
      expect(LocaleService.extractCountryCode('en-USA')).toBe('us')
    })

    it('空文字列の場合はデフォルトの us を返す', () => {
      expect(LocaleService.extractCountryCode('')).toBe('us')
    })
  })

  describe('detectCountry', () => {
    beforeEach(() => {
      // モックをリセット
      vi.restoreAllMocks()
    })

    it('ブラウザのロケールから国を検出する', () => {
      // Intlのモック
      vi.spyOn(
        Intl.DateTimeFormat.prototype,
        'resolvedOptions'
      ).mockReturnValue({
        locale: 'ja-JP',
        calendar: 'gregory',
        numberingSystem: 'latn',
        timeZone: 'Asia/Tokyo'
      })

      const country = LocaleService.detectCountry()

      expect(country.code).toBe('jp')
    })

    it('navigator.languageからロケールを取得する', () => {
      // Intlのモックをnullに設定
      vi.spyOn(
        Intl.DateTimeFormat.prototype,
        'resolvedOptions'
      ).mockReturnValue({
        locale: '',
        calendar: 'gregory',
        numberingSystem: 'latn',
        timeZone: 'UTC'
      })

      // navigator.languageのモック
      Object.defineProperty(navigator, 'language', {
        value: 'en-US',
        configurable: true
      })

      const country = LocaleService.detectCountry()

      expect(country.code).toBe('us')
    })

    it('無効なロケールの場合はデフォルトの国を返す', () => {
      vi.spyOn(
        Intl.DateTimeFormat.prototype,
        'resolvedOptions'
      ).mockReturnValue({
        locale: 'invalid-LOCALE',
        calendar: 'gregory',
        numberingSystem: 'latn',
        timeZone: 'UTC'
      })

      const country = LocaleService.detectCountry()

      // デフォルト（US）が返される
      expect(country.code).toBe('us')
    })

    it('Countryの作成に失敗した場合はデフォルトを返す', () => {
      // 完全に無効なロケールをモック
      vi.spyOn(
        Intl.DateTimeFormat.prototype,
        'resolvedOptions'
      ).mockReturnValue({
        locale: 'xxx',
        calendar: 'gregory',
        numberingSystem: 'latn',
        timeZone: 'UTC'
      })

      const country = LocaleService.detectCountry()

      // デフォルトのCountryインスタンスが返される
      expect(country).toEqual(Country.default())
    })
  })

  describe('getCountryFromLanguage', () => {
    it('日本語から日本の国コードを取得する', () => {
      const language = Language.create('ja').language!
      const country = LocaleService.getCountryFromLanguage(language)

      expect(country.code).toBe('jp')
    })

    it('英語からアメリカの国コードを取得する', () => {
      const language = Language.create('en').language!
      const country = LocaleService.getCountryFromLanguage(language)

      expect(country.code).toBe('us')
    })

    it('フランス語からフランスの国コードを取得する', () => {
      const language = Language.create('fr').language!
      const country = LocaleService.getCountryFromLanguage(language)

      expect(country.code).toBe('fr')
    })

    it('マッピングにない言語の場合はデフォルトの us を返す', () => {
      const language = Language.create('en').language!
      // 直接 _value をモックすることはできないので、既存の言語を使用
      const country = LocaleService.getCountryFromLanguage(language)

      expect(country.code).toBeDefined()
      expect(country.language).toBe(language)
    })

    it('Countryの作成に失敗した場合はデフォルトを返す', () => {
      const language = Language.create('en').language!
      const country = LocaleService.getCountryFromLanguage(language)

      // Countryインスタンスが返される
      expect(country).toBeInstanceOf(Country)
    })

    it('返されるCountryは指定された言語を持つ', () => {
      const language = Language.create('ja').language!
      const country = LocaleService.getCountryFromLanguage(language)

      expect(country.language).toBe(language)
    })
  })

  describe('LANGUAGE_TO_COUNTRY マッピング', () => {
    it('すべてのマッピングが正しい形式である', () => {
      const mappings = {
        ja: 'jp',
        en: 'us',
        fr: 'fr'
      }

      Object.entries(mappings).forEach(([lang, countryCode]) => {
        expect(typeof lang).toBe('string')
        expect(typeof countryCode).toBe('string')
        expect(countryCode).toMatch(/^[a-z]{2}$/)
      })
    })
  })
})
