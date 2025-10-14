import { Language } from '@/domains/valueObjects/language'
import { DeviceValueError } from './error'
import { DeviceResult } from './result'

export class Device {
  static readonly TYPES = {
    NOT_SET: 0,
    ALL: 1,
    MOBILE: 2,
    TABLET: 3,
    PC: 4
  } as const

  private readonly _value: number
  private readonly _language: Language

  private constructor(value: number, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: number, language: Language): DeviceResult {
    const validValues = Object.values(Device.TYPES)
    if (!validValues.includes(value)) {
      const errorMessage = language.isJapanese
        ? '無効なデバイスタイプです'
        : language.isFrench
          ? "Type d'appareil invalide"
          : 'Invalid device type'
      return new DeviceResult(null, new DeviceValueError(errorMessage))
    }
    return new DeviceResult(new Device(value, language), null)
  }

  static notSet(language: Language): Device {
    return new Device(Device.TYPES.NOT_SET, language)
  }

  static all(language: Language): Device {
    return new Device(Device.TYPES.ALL, language)
  }

  static mobile(language: Language): Device {
    return new Device(Device.TYPES.MOBILE, language)
  }

  static tablet(language: Language): Device {
    return new Device(Device.TYPES.TABLET, language)
  }

  static pc(language: Language): Device {
    return new Device(Device.TYPES.PC, language)
  }

  static default(): Device {
    return new Device(Device.TYPES.NOT_SET, Language.default())
  }

  static detect(): Device {
    const userAgent = navigator.userAgent.toLowerCase()

    if (/android/i.test(userAgent)) {
      return Device.mobile(Language.default())
    } else if (/iphone|ipad|ipod/i.test(userAgent)) {
      return Device.mobile(Language.default())
    } else if (/windows phone/i.test(userAgent)) {
      return Device.mobile(Language.default())
    } else if (/tablet/i.test(userAgent)) {
      return Device.tablet(Language.default())
    } else if (/desktop/i.test(userAgent)) {
      return Device.pc(Language.default())
    }
    return Device.pc(Language.default())
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
      case Device.TYPES.NOT_SET:
        return word.options.device?.notSet || 'Not Set'
      case Device.TYPES.ALL:
        return word.options.device?.all || 'All'
      case Device.TYPES.MOBILE:
        return word.options.device?.mobile || 'Mobile'
      case Device.TYPES.TABLET:
        return word.options.device?.tablet || 'Tablet'
      case Device.TYPES.PC:
        return word.options.device?.pc || 'PC'
      default:
        return ''
    }
  }

  get isNotSet(): boolean {
    return this._value === Device.TYPES.NOT_SET
  }

  get isAll(): boolean {
    return this._value === Device.TYPES.ALL
  }

  get isMobile(): boolean {
    return this._value === Device.TYPES.MOBILE
  }

  get isTablet(): boolean {
    return this._value === Device.TYPES.TABLET
  }

  get isPc(): boolean {
    return this._value === Device.TYPES.PC
  }

  equals(other: Device): boolean {
    return this._value === other._value
  }
}
