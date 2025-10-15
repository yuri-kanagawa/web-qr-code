import { describe, it, expect } from 'vitest'
import { Email } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

describe('Email', () => {
  const defaultLanguage = Language.default()

  describe('create', () => {
    it('正しいメールアドレスからEmailを作成できる', () => {
      const result = Email.create('test@example.com', defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.email?.value).toBe('test@example.com')
    })

    it('一般的なメールアドレス形式を受け入れる', () => {
      const validEmails = [
        'user@example.com',
        'user.name@example.com',
        'user+tag@example.co.jp',
        'user_name@example-domain.com',
        'user123@test.org'
      ]

      validEmails.forEach((email) => {
        const result = Email.create(email, defaultLanguage)
        expect(result.isSuccess).toBe(true)
      })
    })

    it('無効なメールアドレスの場合はエラーを返す', () => {
      const invalidEmails = [
        'invalid',
        'invalid@',
        '@example.com',
        'user@',
        'user @example.com',
        'user@example',
        ''
      ]

      invalidEmails.forEach((email) => {
        const result = Email.create(email, defaultLanguage)
        expect(result.isFailure).toBe(true)
      })
    })

    it('空文字列の場合はエラーを返す', () => {
      const result = Email.create('', defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.error).toBeDefined()
    })

    it('日本語でエラーメッセージを返す', () => {
      const japaneseLanguage = Language.create('ja').language!
      const result = Email.create('invalid', japaneseLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.error?.message).toMatch(/メール|形式/)
    })
  })

  describe('default', () => {
    it('空のEmailインスタンスを返す', () => {
      const email = Email.default()

      expect(email.value).toBe('')
    })
  })
})
