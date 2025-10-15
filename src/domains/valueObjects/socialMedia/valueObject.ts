import { Language } from '@/domains/valueObjects/language'
import { SocialMediaValueError } from './error'
import { SocialMediaResult } from './result'

export class SocialMedia {
  static readonly TYPES = {
    NOT_SET: 0,
    FACEBOOK: 1,
    YOUTUBE: 2,
    WHATSAPP: 3,
    INSTAGRAM: 4,
    TIKTOK: 5,
    X: 6,
    LINKEDIN: 7,
    SNAPCHAT: 8,
    PINTEREST: 9,
    REDDIT: 10,
    WECHAT: 11,
    TELEGRAM: 12,
    DISCORD: 13,
    TUMBLR: 14,
    THREADS: 15,
    MASTODON: 16,
    BLUESKY: 17
  } as const

  static readonly list = [
    SocialMedia.TYPES.NOT_SET,
    SocialMedia.TYPES.FACEBOOK,
    SocialMedia.TYPES.YOUTUBE,
    SocialMedia.TYPES.WHATSAPP,
    SocialMedia.TYPES.INSTAGRAM,
    SocialMedia.TYPES.TIKTOK,
    SocialMedia.TYPES.X,
    SocialMedia.TYPES.LINKEDIN,
    SocialMedia.TYPES.SNAPCHAT,
    SocialMedia.TYPES.PINTEREST,
    SocialMedia.TYPES.REDDIT,
    SocialMedia.TYPES.WECHAT,
    SocialMedia.TYPES.TELEGRAM,
    SocialMedia.TYPES.DISCORD,
    SocialMedia.TYPES.TUMBLR,
    SocialMedia.TYPES.THREADS,
    SocialMedia.TYPES.MASTODON,
    SocialMedia.TYPES.BLUESKY
  ] as const

  static isNotSet(value: number): boolean {
    return value === SocialMedia.TYPES.NOT_SET
  }

  private readonly _value: number
  private readonly _language: Language

  private constructor(value: number, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: number, language: Language): SocialMediaResult {
    if (!SocialMedia.list.includes(value as any)) {
      const errorMessage = language.isJapanese
        ? '無効なソーシャルメディアタイプです'
        : language.isFrench
          ? 'Type de média social invalide'
          : 'Invalid social media type'
      return new SocialMediaResult(
        null,
        new SocialMediaValueError(errorMessage)
      )
    }
    return new SocialMediaResult(new SocialMedia(value, language), null)
  }

  static notSet(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.NOT_SET, language)
  }

  static facebook(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.FACEBOOK, language)
  }

  static youtube(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.YOUTUBE, language)
  }

  static whatsapp(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.WHATSAPP, language)
  }

  static instagram(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.INSTAGRAM, language)
  }

  static tiktok(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.TIKTOK, language)
  }

  static x(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.X, language)
  }

  static linkedin(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.LINKEDIN, language)
  }

  static snapchat(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.SNAPCHAT, language)
  }

  static pinterest(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.PINTEREST, language)
  }

  static reddit(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.REDDIT, language)
  }

  static wechat(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.WECHAT, language)
  }

  static telegram(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.TELEGRAM, language)
  }

  static discord(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.DISCORD, language)
  }

  static tumblr(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.TUMBLR, language)
  }

  static threads(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.THREADS, language)
  }

  static mastodon(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.MASTODON, language)
  }

  static bluesky(language: Language): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.BLUESKY, language)
  }

  static default(): SocialMedia {
    return new SocialMedia(SocialMedia.TYPES.NOT_SET, Language.default())
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
      case SocialMedia.TYPES.NOT_SET:
        return word.options.socialMedia?.notSet || 'Not Set'
      case SocialMedia.TYPES.FACEBOOK:
        return word.options.socialMedia?.facebook || 'Facebook'
      case SocialMedia.TYPES.YOUTUBE:
        return word.options.socialMedia?.youtube || 'YouTube'
      case SocialMedia.TYPES.WHATSAPP:
        return word.options.socialMedia?.whatsapp || 'WhatsApp'
      case SocialMedia.TYPES.INSTAGRAM:
        return word.options.socialMedia?.instagram || 'Instagram'
      case SocialMedia.TYPES.TIKTOK:
        return word.options.socialMedia?.tiktok || 'TikTok'
      case SocialMedia.TYPES.X:
        return word.options.socialMedia?.x || 'X'
      case SocialMedia.TYPES.LINKEDIN:
        return word.options.socialMedia?.linkedin || 'LinkedIn'
      case SocialMedia.TYPES.SNAPCHAT:
        return word.options.socialMedia?.snapchat || 'Snapchat'
      case SocialMedia.TYPES.PINTEREST:
        return word.options.socialMedia?.pinterest || 'Pinterest'
      case SocialMedia.TYPES.REDDIT:
        return word.options.socialMedia?.reddit || 'Reddit'
      case SocialMedia.TYPES.WECHAT:
        return word.options.socialMedia?.wechat || 'WeChat'
      case SocialMedia.TYPES.TELEGRAM:
        return word.options.socialMedia?.telegram || 'Telegram'
      case SocialMedia.TYPES.DISCORD:
        return word.options.socialMedia?.discord || 'Discord'
      case SocialMedia.TYPES.TUMBLR:
        return word.options.socialMedia?.tumblr || 'Tumblr'
      case SocialMedia.TYPES.THREADS:
        return word.options.socialMedia?.threads || 'Threads'
      case SocialMedia.TYPES.MASTODON:
        return word.options.socialMedia?.mastodon || 'Mastodon'
      case SocialMedia.TYPES.BLUESKY:
        return word.options.socialMedia?.bluesky || 'Bluesky'
      default:
        return ''
    }
  }

  get isNotSet(): boolean {
    return this._value === SocialMedia.TYPES.NOT_SET
  }

  equals(other: SocialMedia): boolean {
    return this._value === other._value
  }
}
