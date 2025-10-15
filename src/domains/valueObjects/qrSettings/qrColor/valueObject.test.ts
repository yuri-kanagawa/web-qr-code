import { Language } from '@/domains/valueObjects/language'
import { describe, expect, it } from 'vitest'
import { QrColor } from './valueObject'

describe('QrColor', () => {
  const defaultLanguage = Language.default()

  describe('create', () => {
    it('有効な16進数カラーコードを作成できる', () => {
      const result = QrColor.create('#FF5733', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.qrColor?.value).toBe('#FF5733')
    })

    it('小文字の16進数カラーコードも作成できる', () => {
      const result = QrColor.create('#ff5733', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.qrColor?.value).toBe('#ff5733')
    })

    it('黒色を作成できる', () => {
      const result = QrColor.create('#000000', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.qrColor?.value).toBe('#000000')
    })

    it('白色を作成できる', () => {
      const result = QrColor.create('#ffffff', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.qrColor?.value).toBe('#ffffff')
    })

    it('#が無い場合はエラーを返す', () => {
      const result = QrColor.create('FF5733', defaultLanguage)

      expect(result.isFailure).toBe(true)
    })

    it('3桁の形式はエラーを返す', () => {
      const result = QrColor.create('#FFF', defaultLanguage)

      expect(result.isFailure).toBe(true)
    })

    it('無効な文字が含まれる場合はエラーを返す', () => {
      const result = QrColor.create('#GGGGGG', defaultLanguage)

      expect(result.isFailure).toBe(true)
    })

    it('日本語でエラーメッセージを返す', () => {
      const japaneseLanguage = Language.create('ja').language!
      const result = QrColor.create('invalid', japaneseLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toContain('16進数')
    })
  })

  describe('ファクトリメソッド', () => {
    it('black()で黒色を作成できる', () => {
      const color = QrColor.black()
      expect(color.value).toBe('#000000')
    })

    it('white()で白色を作成できる', () => {
      const color = QrColor.white()
      expect(color.value).toBe('#ffffff')
    })

    it('default()で黒色を作成できる', () => {
      const color = QrColor.default()
      expect(color.value).toBe('#000000')
    })
  })

  describe('equals', () => {
    it('同じ色の場合はtrueを返す', () => {
      const color1 = QrColor.create('#FF5733', defaultLanguage).qrColor!
      const color2 = QrColor.create('#FF5733', defaultLanguage).qrColor!

      expect(color1.equals(color2)).toBe(true)
    })

    it('大文字小文字を区別せず比較する', () => {
      const color1 = QrColor.create('#FF5733', defaultLanguage).qrColor!
      const color2 = QrColor.create('#ff5733', defaultLanguage).qrColor!

      expect(color1.equals(color2)).toBe(true)
    })

    it('異なる色の場合はfalseを返す', () => {
      const color1 = QrColor.create('#FF5733', defaultLanguage).qrColor!
      const color2 = QrColor.create('#000000', defaultLanguage).qrColor!

      expect(color1.equals(color2)).toBe(false)
    })
  })
})
