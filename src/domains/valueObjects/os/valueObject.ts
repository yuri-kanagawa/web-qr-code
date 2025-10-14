import { Language } from '@/domains/valueObjects/language'
import { OsValueError } from './error'
import { OsResult } from './result'

export class Os {
  static readonly TYPES = {
    NOT_SET: 0,
    WINDOWS: 1,
    MACINTOSH: 2,
    IOS: 3,
    ANDROID: 4,
    LINUX: 5,
    OTHER: 6
  } as const

  static readonly list = [
    Os.TYPES.NOT_SET,
    Os.TYPES.WINDOWS,
    Os.TYPES.MACINTOSH,
    Os.TYPES.IOS,
    Os.TYPES.ANDROID,
    Os.TYPES.LINUX,
    Os.TYPES.OTHER
  ] as const

  static isNotSet(value: number): boolean {
    return value === Os.TYPES.NOT_SET
  }

  static isWindows(value: number): boolean {
    return value === Os.TYPES.WINDOWS
  }

  static isMacintosh(value: number): boolean {
    return value === Os.TYPES.MACINTOSH
  }

  static isIos(value: number): boolean {
    return value === Os.TYPES.IOS
  }

  static isMacintoshOrIos(value: number): boolean {
    return Os.isMacintosh(value) || Os.isIos(value)
  }

  static isAndroid(value: number): boolean {
    return value === Os.TYPES.ANDROID
  }

  static isLinux(value: number): boolean {
    return value === Os.TYPES.LINUX
  }

  static isOther(value: number): boolean {
    return value === Os.TYPES.OTHER
  }

  private readonly _value: number
  private readonly _language: Language

  private constructor(value: number, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: number, language: Language): OsResult {
    if (!Os.list.includes(value as any)) {
      const errorMessage = language.isJapanese
        ? '無効なOSタイプです'
        : language.isFrench
          ? "Type de système d'exploitation invalide"
          : 'Invalid OS type'
      return new OsResult(null, new OsValueError(errorMessage))
    }
    return new OsResult(new Os(value, language), null)
  }

  static notSet(language: Language): Os {
    return new Os(Os.TYPES.NOT_SET, language)
  }

  static windows(language: Language): Os {
    return new Os(Os.TYPES.WINDOWS, language)
  }

  static macintosh(language: Language): Os {
    return new Os(Os.TYPES.MACINTOSH, language)
  }

  static ios(language: Language): Os {
    return new Os(Os.TYPES.IOS, language)
  }

  static android(language: Language): Os {
    return new Os(Os.TYPES.ANDROID, language)
  }

  static linux(language: Language): Os {
    return new Os(Os.TYPES.LINUX, language)
  }

  static other(language: Language): Os {
    return new Os(Os.TYPES.OTHER, language)
  }

  static default(): Os {
    return new Os(Os.TYPES.NOT_SET, Language.default())
  }

  static detect(): Os {
    const userAgent = navigator.userAgent

    if (/Windows/i.test(userAgent)) {
      return Os.windows(Language.default())
    } else if (/Macintosh/i.test(userAgent)) {
      return Os.macintosh(Language.default())
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return Os.ios(Language.default())
    } else if (/Android/i.test(userAgent)) {
      return Os.android(Language.default())
    } else if (/Linux/i.test(userAgent)) {
      return Os.linux(Language.default())
    }
    return Os.other(Language.default())
  }

  get value(): number {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  get name(): string {
    const locale = this._language.getLocale()
    const { word } = locale

    switch (this._value) {
      case Os.TYPES.NOT_SET:
        return word.options.os?.notSet || 'Not Set'
      case Os.TYPES.WINDOWS:
        return word.options.os?.windows || 'Windows'
      case Os.TYPES.MACINTOSH:
        return word.options.os?.macintosh || 'Macintosh'
      case Os.TYPES.IOS:
        return word.options.os?.ios || 'iOS'
      case Os.TYPES.ANDROID:
        return word.options.os?.android || 'Android'
      case Os.TYPES.LINUX:
        return word.options.os?.linux || 'Linux'
      case Os.TYPES.OTHER:
        return word.options.os?.other || 'Other'
      default:
        return ''
    }
  }

  get isNotSet(): boolean {
    return this._value === Os.TYPES.NOT_SET
  }

  get isWindows(): boolean {
    return this._value === Os.TYPES.WINDOWS
  }

  get isMacintosh(): boolean {
    return this._value === Os.TYPES.MACINTOSH
  }

  get isIos(): boolean {
    return this._value === Os.TYPES.IOS
  }

  get isMacintoshOrIos(): boolean {
    return this.isMacintosh || this.isIos
  }

  get isAndroid(): boolean {
    return this._value === Os.TYPES.ANDROID
  }

  get isLinux(): boolean {
    return this._value === Os.TYPES.LINUX
  }

  get isOther(): boolean {
    return this._value === Os.TYPES.OTHER
  }

  equals(other: Os): boolean {
    return this._value === other._value
  }
}
