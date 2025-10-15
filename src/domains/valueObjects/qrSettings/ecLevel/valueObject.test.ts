import { Language } from '@/domains/valueObjects/language'
import { describe, expect, it } from 'vitest'
import { EcLevel } from './valueObject'

describe('EcLevel', () => {
  const defaultLanguage = Language.default()

  describe('create', () => {
    it('有効なエラー訂正レベルLを作成できる', () => {
      const result = EcLevel.create('L', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.ecLevel?.value).toBe('L')
    })

    it('有効なエラー訂正レベルMを作成できる', () => {
      const result = EcLevel.create('M', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.ecLevel?.value).toBe('M')
    })

    it('有効なエラー訂正レベルQを作成できる', () => {
      const result = EcLevel.create('Q', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.ecLevel?.value).toBe('Q')
    })

    it('有効なエラー訂正レベルHを作成できる', () => {
      const result = EcLevel.create('H', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.ecLevel?.value).toBe('H')
    })

    it('無効な値の場合はエラーを返す', () => {
      const result = EcLevel.create('X', defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.error).toBeDefined()
    })

    it('小文字の場合はエラーを返す', () => {
      const result = EcLevel.create('m', defaultLanguage)

      expect(result.isFailure).toBe(true)
    })

    it('日本語でエラーメッセージを返す', () => {
      const japaneseLanguage = Language.create('ja').language!
      const result = EcLevel.create('X', japaneseLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toContain('無効')
    })
  })

  describe('default', () => {
    it('デフォルト値Mを返す', () => {
      const ecLevel = EcLevel.default()

      expect(ecLevel.value).toBe('M')
    })
  })

  describe('ファクトリメソッド', () => {
    it('L()でレベルLを作成できる', () => {
      const ecLevel = EcLevel.L()
      expect(ecLevel.value).toBe('L')
    })

    it('M()でレベルMを作成できる', () => {
      const ecLevel = EcLevel.M()
      expect(ecLevel.value).toBe('M')
    })

    it('Q()でレベルQを作成できる', () => {
      const ecLevel = EcLevel.Q()
      expect(ecLevel.value).toBe('Q')
    })

    it('H()でレベルHを作成できる', () => {
      const ecLevel = EcLevel.H()
      expect(ecLevel.value).toBe('H')
    })
  })

  describe('name', () => {
    it('英語で名前を取得できる', () => {
      const ecLevel = EcLevel.M()
      expect(ecLevel.name).toBe('Medium (M)')
    })

    it('日本語で名前を取得できる', () => {
      const japaneseLanguage = Language.create('ja').language!
      const ecLevel = EcLevel.M(japaneseLanguage)
      expect(ecLevel.name).toBe('中 (M)')
    })
  })

  describe('equals', () => {
    it('同じ値の場合はtrueを返す', () => {
      const ecLevel1 = EcLevel.M()
      const ecLevel2 = EcLevel.M()

      expect(ecLevel1.equals(ecLevel2)).toBe(true)
    })

    it('異なる値の場合はfalseを返す', () => {
      const ecLevel1 = EcLevel.M()
      const ecLevel2 = EcLevel.H()

      expect(ecLevel1.equals(ecLevel2)).toBe(false)
    })
  })
})
