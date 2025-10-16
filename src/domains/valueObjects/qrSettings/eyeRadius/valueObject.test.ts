import { Language } from '@/domains/valueObjects/language'
import { describe, expect, it } from 'vitest'
import { EyeRadius } from './valueObject'

describe('EyeRadius', () => {
  const defaultLanguage = Language.default()

  describe('create', () => {
    it('有効な値を作成できる', () => {
      const result = EyeRadius.create(10, defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.eyeRadius?.value).toBe(10)
    })

    it('最小値で作成できる', () => {
      const result = EyeRadius.create(EyeRadius.MIN, defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.eyeRadius?.value).toBe(0)
    })

    it('最大値で作成できる', () => {
      const result = EyeRadius.create(EyeRadius.MAX, defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.eyeRadius?.value).toBe(20)
    })

    it('最小値未満の場合はエラーを返す', () => {
      const result = EyeRadius.create(-1, defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toBeTruthy()
    })

    it('最大値超過の場合はエラーを返す', () => {
      const result = EyeRadius.create(21, defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toBeTruthy()
    })

    it('NaNの場合はエラーを返す', () => {
      const result = EyeRadius.create(NaN, defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toMatch(/number|数値/)
    })

    it('日本語でエラーメッセージを返す', () => {
      const japaneseLanguage = Language.create('ja').language!
      const result = EyeRadius.create(100, japaneseLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toContain('から')
    })
  })

  describe('default', () => {
    it('デフォルト値0を返す', () => {
      const eyeRadius = EyeRadius.default()

      expect(eyeRadius.value).toBe(0)
    })
  })

  describe('equals', () => {
    it('同じ値の場合はtrueを返す', () => {
      const radius1 = EyeRadius.create(10, defaultLanguage).eyeRadius!
      const radius2 = EyeRadius.create(10, defaultLanguage).eyeRadius!

      expect(radius1.equals(radius2)).toBe(true)
    })

    it('異なる値の場合はfalseを返す', () => {
      const radius1 = EyeRadius.create(10, defaultLanguage).eyeRadius!
      const radius2 = EyeRadius.create(15, defaultLanguage).eyeRadius!

      expect(radius1.equals(radius2)).toBe(false)
    })
  })
})
