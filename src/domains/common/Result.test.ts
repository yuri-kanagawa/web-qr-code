import { beforeEach, describe, expect, it } from 'vitest'
import { Result } from './Result'

// テスト用のResult派生クラス
class TestResult extends Result<string, Error> {
  private constructor(value: string | null, error: Error | null) {
    super(value, error)
  }

  static ok(value: string): TestResult {
    return new TestResult(value, null)
  }

  static fail(error: Error): TestResult {
    return new TestResult(null, error)
  }
}

describe('Result', () => {
  describe('ok', () => {
    let result: TestResult

    beforeEach(() => {
      result = TestResult.ok('test value')
    })

    it('成功を表すResultを作成できる', () => {
      expect(result).toBeInstanceOf(Result)
      expect(result.isSuccess).toBe(true)
      expect(result.isFailure).toBe(false)
    })

    it('valueを取得できる', () => {
      expect(result.value).toBe('test value')
    })

    it('errorはnullである', () => {
      expect(result.error).toBeNull()
    })

    it('errorMessageは空文字列である', () => {
      expect(result.errorMessage).toBe('')
    })

    it('getOrElseは値を返す', () => {
      expect(result.getOrElse('default')).toBe('test value')
    })
  })

  describe('fail', () => {
    let result: TestResult
    const error = new Error('Test error')

    beforeEach(() => {
      result = TestResult.fail(error)
    })

    it('失敗を表すResultを作成できる', () => {
      expect(result).toBeInstanceOf(Result)
      expect(result.isSuccess).toBe(false)
      expect(result.isFailure).toBe(true)
    })

    it('valueはnullである', () => {
      expect(result.value).toBeNull()
    })

    it('errorを取得できる', () => {
      expect(result.error).toBe(error)
    })

    it('errorMessageを取得できる', () => {
      expect(result.errorMessage).toBe('Test error')
    })

    it('getOrElseはデフォルト値を返す', () => {
      expect(result.getOrElse('default')).toBe('default')
    })
  })

  describe('基底クラスのstaticメソッド', () => {
    it('Result.okで成功Resultを作成できる', () => {
      const result = Result.ok('success')

      expect(result.isSuccess).toBe(true)
      expect(result.value).toBe('success')
    })

    it('Result.failで失敗Resultを作成できる', () => {
      const error = new Error('failure')
      const result = Result.fail(error)

      expect(result.isFailure).toBe(true)
      expect(result.error).toBe(error)
    })
  })

  describe('エッジケース', () => {
    it('空文字列の値でも成功Resultを作成できる', () => {
      const result = TestResult.ok('')

      expect(result.isSuccess).toBe(true)
      expect(result.value).toBe('')
    })

    it('errorMessageがundefinedの場合は空文字列を返す', () => {
      // @ts-expect-error Testing edge case
      const error = { message: undefined }
      const result = TestResult.fail(error as Error)

      expect(result.errorMessage).toBe('')
    })

    it('数値の値でも動作する', () => {
      class NumberResult extends Result<number, Error> {
        private constructor(value: number | null, error: Error | null) {
          super(value, error)
        }

        static ok(value: number): NumberResult {
          return new NumberResult(value, null)
        }
      }

      const result = NumberResult.ok(0)

      expect(result.isSuccess).toBe(true)
      expect(result.value).toBe(0)
    })

    it('複雑なオブジェクトでも動作する', () => {
      interface User {
        id: number
        name: string
      }

      class UserResult extends Result<User, Error> {
        private constructor(value: User | null, error: Error | null) {
          super(value, error)
        }

        static ok(value: User): UserResult {
          return new UserResult(value, null)
        }
      }

      const user = { id: 1, name: 'Test User' }
      const result = UserResult.ok(user)

      expect(result.isSuccess).toBe(true)
      expect(result.value).toEqual(user)
    })
  })

  describe('不正なResult作成の防止', () => {
    it('valueとerrorの両方がnullの場合はエラーをthrowする', () => {
      class InvalidResult extends Result<string, Error> {
        constructor() {
          super(null, null)
        }
      }

      expect(() => new InvalidResult()).toThrow(
        'Result must have either value or error, not both or neither'
      )
    })

    it('valueとerrorの両方が存在する場合はエラーをthrowする', () => {
      class InvalidResult extends Result<string, Error> {
        constructor() {
          super('value', new Error('error'))
        }
      }

      expect(() => new InvalidResult()).toThrow(
        'Result must have either value or error, not both or neither'
      )
    })
  })
})

