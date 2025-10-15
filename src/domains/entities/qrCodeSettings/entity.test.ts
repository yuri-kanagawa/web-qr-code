import { Language } from '@/domains/valueObjects/language'
import { EcLevel, QrColor, QrSize } from '@/domains/valueObjects/qrSettings'
import { describe, expect, it } from 'vitest'
import { QrCodeSettings } from './entity'

describe('QrCodeSettings', () => {
  describe('fromSearchParams', () => {
    it('SearchParamsからQrCodeSettingsを作成できる', () => {
      const params = new URLSearchParams({
        ecLevel: 'H',
        size: '250',
        fgColor: '#000000',
        bgColor: '#ffffff'
      })

      const settings = QrCodeSettings.fromSearchParams(params)

      expect(settings.ecLevel.value).toBe('H')
      expect(settings.size.value).toBe(250)
      expect(settings.colors.fgColor.value).toBe('#000000')
      expect(settings.colors.bgColor.value).toBe('#ffffff')
    })

    it('パラメータが無い場合はデフォルト値を使用する', () => {
      const params = new URLSearchParams()

      const settings = QrCodeSettings.fromSearchParams(params)

      expect(settings.ecLevel.value).toBe('M')
      expect(settings.size.value).toBe(150)
    })

    it('無効な値の場合はデフォルト値を使用する', () => {
      const params = new URLSearchParams({
        ecLevel: 'INVALID',
        size: '99999'
      })

      const settings = QrCodeSettings.fromSearchParams(params)

      expect(settings.ecLevel.value).toBe('M')
      expect(settings.size.value).toBe(150)
    })

    it('ロゴ設定を正しく読み込める', () => {
      const params = new URLSearchParams({
        logoImage: 'https://example.com/logo.png',
        logoWidth: '50',
        logoHeight: '50',
        logoOpacity: '0.8',
        logoPadding: '10',
        logoPaddingStyle: 'circle'
      })

      const settings = QrCodeSettings.fromSearchParams(params)

      expect(settings.logo.image).toBe('https://example.com/logo.png')
      expect(settings.logo.width).toBe(50)
      expect(settings.logo.height).toBe(50)
      expect(settings.logo.opacity).toBe(0.8)
      expect(settings.logo.padding).toBe(10)
      expect(settings.logo.paddingStyle).toBe('circle')
    })

    it('目の設定を正しく読み込める', () => {
      const params = new URLSearchParams({
        eyeRadius1: '5',
        eyeRadius2: '10',
        eyeRadius3: '15'
      })

      const settings = QrCodeSettings.fromSearchParams(params)

      expect(settings.eye.radius1).toBe(5)
      expect(settings.eye.radius2).toBe(10)
      expect(settings.eye.radius3).toBe(15)
    })

    it('目の色を個別に設定できる', () => {
      const params = new URLSearchParams({
        fgColor: '#000000',
        eyeColor1: '#FF0000',
        eyeColor2: '#00FF00',
        eyeColor3: '#0000FF'
      })

      const settings = QrCodeSettings.fromSearchParams(params)

      expect(settings.colors.eyeColor1.value).toBe('#FF0000')
      expect(settings.colors.eyeColor2.value).toBe('#00FF00')
      expect(settings.colors.eyeColor3.value).toBe('#0000FF')
    })

    it('目の色が指定されていない場合はfgColorを使用する', () => {
      const params = new URLSearchParams({
        fgColor: '#FF5733'
      })

      const settings = QrCodeSettings.fromSearchParams(params)

      expect(settings.colors.eyeColor1.value).toBe('#FF5733')
      expect(settings.colors.eyeColor2.value).toBe('#FF5733')
      expect(settings.colors.eyeColor3.value).toBe('#FF5733')
    })
  })

  describe('toSearchParams', () => {
    it('QrCodeSettingsをSearchParamsに変換できる', () => {
      const settings = QrCodeSettings.default()
      const params = settings.toSearchParams()

      expect(params.ecLevel).toBe('M')
      expect(params.size).toBe('150')
      expect(params.fgColor).toBeDefined()
      expect(params.bgColor).toBeDefined()
    })

    it('fromSearchParams -> toSearchParams でラウンドトリップできる', () => {
      const originalParams = new URLSearchParams({
        ecLevel: 'H',
        size: '250',
        fgColor: '#FF5733',
        bgColor: '#FFFFFF'
      })

      const settings = QrCodeSettings.fromSearchParams(originalParams)
      const convertedParams = settings.toSearchParams()

      expect(convertedParams.ecLevel).toBe('H')
      expect(convertedParams.size).toBe('250')
      expect(convertedParams.fgColor).toBe('#FF5733')
      expect(convertedParams.bgColor).toBe('#FFFFFF')
    })
  })

  describe('default', () => {
    it('デフォルト設定を作成できる', () => {
      const settings = QrCodeSettings.default()

      expect(settings.ecLevel.value).toBe('M')
      expect(settings.size.value).toBe(150)
      expect(settings.colors.fgColor.value).toBe('#000000')
      expect(settings.colors.bgColor.value).toBe('#ffffff')
    })
  })

  describe('変更メソッド（不変性）', () => {
    it('changeEcLevelで新しいインスタンスを返す', () => {
      const settings = QrCodeSettings.default()
      const newEcLevel = EcLevel.H()
      const newSettings = settings.changeEcLevel(newEcLevel)

      expect(newSettings.ecLevel.value).toBe('H')
      expect(settings.ecLevel.value).toBe('M') // 元のインスタンスは変更されない
      expect(settings).not.toBe(newSettings) // 異なるインスタンス
    })

    it('changeSizeで新しいインスタンスを返す', () => {
      const settings = QrCodeSettings.default()
      const newSize = QrSize.create(300, Language.default()).qrSize!
      const newSettings = settings.changeSize(newSize)

      expect(newSettings.size.value).toBe(300)
      expect(settings.size.value).toBe(150)
    })

    it('changeColorsで新しいインスタンスを返す', () => {
      const settings = QrCodeSettings.default()
      const newColors = settings.colors.changeFgColor(
        QrColor.create('#FF0000', Language.default()).qrColor!
      )
      const newSettings = settings.changeColors(newColors)

      expect(newSettings.colors.fgColor.value).toBe('#FF0000')
      expect(settings.colors.fgColor.value).toBe('#000000')
    })
  })
})
