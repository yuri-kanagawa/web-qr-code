import { Result } from '@/domains/valueObjects/result'

export class SSID {
  private readonly _value: string

  private constructor(value: string) {
    this._value = value
  }

  public static create(value: string): Result<SSID> {
    // SSIDのバリデーション
    if (value.length === 0) {
      return Result.failure('SSID is required')
    }

    if (value.length > 32) {
      return Result.failure('SSID must be 32 characters or less')
    }

    // 日本語文字のチェック（ひらがな、カタカナ、漢字）
    const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/
    if (japaneseRegex.test(value)) {
      return Result.failure('SSID cannot contain Japanese characters')
    }

    // 制御文字のチェック
    const controlCharRegex = /[\x00-\x1F\x7F]/
    if (controlCharRegex.test(value)) {
      return Result.failure('SSID cannot contain control characters')
    }

    return Result.success(new SSID(value))
  }

  public get value(): string {
    return this._value
  }

  public equals(other: SSID): boolean {
    return this._value === other._value
  }

  public toString(): string {
    return this._value
  }
}
