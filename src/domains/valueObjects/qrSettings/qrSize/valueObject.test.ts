import { Language } from '@/domains/valueObjects/language'
import { describe, expect, it } from 'vitest'
import { QrSize } from './valueObject'

describe('QrSize', () => {
  const defaultLanguage = Language.default()

  describe('create', () => {
    it('有効なサイズを作成できる', () => {
      const result = QrSize.create(200, defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.qrSize?.value).toBe(200)
    })

    it('最小値で作成できる', () => {
      const result = QrSize.create(QrSize.MIN, defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.qrSize?.value).toBe(50)
    })

    it('最大値で作成できる', () => {
      const result = QrSize.create(QrSize.MAX, defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.qrSize?.value).toBe(1000)
    })

    it('最小値未満の場合はエラーを返す', () => {
      const result = QrSize.create(49, defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toBeTruthy()
    })

    it('最大値超過の場合はエラーを返す', () => {
      const result = QrSize.create(1001, defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toBeTruthy()
    })

    it('NaNの場合はエラーを返す', () => {
      const result = QrSize.create(NaN, defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toMatch(/number|数値/)
    })

    it('日本語でエラーメッセージを返す', () => {
      const japaneseLanguage = Language.create('ja').language!
      const result = QrSize.create(10, japaneseLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toContain('から')
    })
  })

  describe('default', () => {
    it('デフォルト値150を返す', () => {
      const qrSize = QrSize.default()

      expect(qrSize.value).toBe(150)
    })
  })

  describe('equals', () => {
    it('同じサイズの場合はtrueを返す', () => {
      const size1 = QrSize.create(200, defaultLanguage).qrSize!
      const size2 = QrSize.create(200, defaultLanguage).qrSize!

      expect(size1.equals(size2)).toBe(true)
    })

    it('異なるサイズの場合はfalseを返す', () => {
      const size1 = QrSize.create(200, defaultLanguage).qrSize!
      const size2 = QrSize.create(300, defaultLanguage).qrSize!

      expect(size1.equals(size2)).toBe(false)
    })
  })
})
