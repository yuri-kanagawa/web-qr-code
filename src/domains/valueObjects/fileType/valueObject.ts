import { Language } from '@/domains/valueObjects/language'

export class FileType {
  // 固定の定数として定義
  static readonly PNG = 0
  static readonly JPEG = 1
  static readonly SVG = 2
  static readonly WEBP = 3

  private constructor(private readonly _value: number) {}

  static create(
    value: string | number,
    language: Language
  ): { isSuccess: boolean; fileType?: FileType; error?: string } {
    // 数字の場合は直接処理
    if (typeof value === 'number') {
      switch (value) {
        case FileType.PNG:
          return {
            isSuccess: true,
            fileType: new FileType(FileType.PNG)
          }
        case FileType.JPEG:
          return {
            isSuccess: true,
            fileType: new FileType(FileType.JPEG)
          }
        case FileType.SVG:
          return {
            isSuccess: true,
            fileType: new FileType(FileType.SVG)
          }
        case FileType.WEBP:
          return {
            isSuccess: true,
            fileType: new FileType(FileType.WEBP)
          }
        default:
          return {
            isSuccess: false,
            error: language.isEnglish
              ? `Invalid file type number: ${value}`
              : `無効なファイルタイプ番号: ${value}`
          }
      }
    }

    // 文字列の場合は従来通り
    switch (value.toLowerCase()) {
      case 'png':
        return {
          isSuccess: true,
          fileType: new FileType(FileType.PNG)
        }
      case 'jpeg':
      case 'jpg':
        return {
          isSuccess: true,
          fileType: new FileType(FileType.JPEG)
        }
      case 'svg':
        return {
          isSuccess: true,
          fileType: new FileType(FileType.SVG)
        }
      case 'webp':
        return {
          isSuccess: true,
          fileType: new FileType(FileType.WEBP)
        }
      default:
        return {
          isSuccess: false,
          error: language.isEnglish
            ? `Invalid file type: ${value}`
            : `無効なファイル形式: ${value}`
        }
    }
  }

  static default(): FileType {
    return new FileType(FileType.PNG)
  }

  // ファイルタイプを変更する専用メソッド
  changeToPng(): FileType {
    return new FileType(FileType.PNG)
  }

  changeToJpeg(): FileType {
    return new FileType(FileType.JPEG)
  }

  changeToSvg(): FileType {
    return new FileType(FileType.SVG)
  }

  changeToWebp(): FileType {
    return new FileType(FileType.WEBP)
  }

  // 数字でファイルタイプを作成する便利メソッド
  static fromNumber(value: number): FileType | null {
    switch (value) {
      case FileType.PNG:
        return new FileType(FileType.PNG)
      case FileType.JPEG:
        return new FileType(FileType.JPEG)
      case FileType.SVG:
        return new FileType(FileType.SVG)
      case FileType.WEBP:
        return new FileType(FileType.WEBP)
      default:
        return null
    }
  }

  // 利用可能なファイルタイプの数字リストを取得
  static getAvailableNumbers(): number[] {
    return [FileType.PNG, FileType.JPEG, FileType.SVG, FileType.WEBP]
  }

  get value(): number {
    return this._value
  }

  // 数字の値を取得
  get numberValue(): number {
    return this._value
  }

  get name(): string {
    switch (this._value) {
      case FileType.PNG:
        return 'PNG'
      case FileType.JPEG:
        return 'JPEG'
      case FileType.SVG:
        return 'SVG'
      case FileType.WEBP:
        return 'WebP'
      default:
        return 'Unknown'
    }
  }

  get extension(): string {
    switch (this._value) {
      case FileType.PNG:
        return 'png'
      case FileType.JPEG:
        return 'jpg'
      case FileType.SVG:
        return 'svg'
      case FileType.WEBP:
        return 'webp'
      default:
        return 'png'
    }
  }

  get mimeType(): string {
    switch (this._value) {
      case FileType.PNG:
        return 'image/png'
      case FileType.JPEG:
        return 'image/jpeg'
      case FileType.SVG:
        return 'image/svg+xml'
      case FileType.WEBP:
        return 'image/webp'
      default:
        return 'image/png'
    }
  }

  get displayName(): string {
    switch (this._value) {
      case FileType.PNG:
        return 'PNG'
      case FileType.JPEG:
        return 'JPEG'
      case FileType.SVG:
        return 'SVG'
      case FileType.WEBP:
        return 'WebP'
      default:
        return 'Unknown'
    }
  }

  equals(other: FileType): boolean {
    return this._value === other._value
  }
}
