import { describe, it, expect, vi } from 'vitest'
import { Base64 } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

describe('Base64', () => {
  const defaultLanguage = Language.default()

  describe('create', () => {
    it('正しいBase64文字列から作成できる', () => {
      const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'
      const result = Base64.create(base64String, defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.base64?.value).toBe(base64String)
      expect(result.base64?.mimeType).toBe('image/png')
    })

    it('JPEG画像のMIMEタイプを正しく抽出する', () => {
      const base64String = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA'
      const result = Base64.create(base64String, defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.base64?.mimeType).toBe('image/jpeg')
      expect(result.base64?.isImage).toBe(true)
    })

    it('GIF画像のMIMEタイプを正しく抽出する', () => {
      const base64String = 'data:image/gif;base64,R0lGODlhAQABAIAA'
      const result = Base64.create(base64String, defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.base64?.mimeType).toBe('image/gif')
    })

    it('空文字列の場合はエラーを返す', () => {
      const result = Base64.create('', defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.error?.message).toMatch(/empty|空/)
    })

    it('無効な形式の場合はエラーを返す', () => {
      const result = Base64.create('invalid-base64', defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.error?.message).toMatch(/Invalid|invalid|無効/)
    })

    it('data:プレフィックスがない場合はエラーを返す', () => {
      const result = Base64.create('iVBORw0KGgoAAAANSUhEUgAAAAUA', defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.error).toBeDefined()
    })

    it('日本語でエラーメッセージを返す', () => {
      const japaneseLanguage = Language.create('ja').language!
      const result = Base64.create('', japaneseLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.error?.message).toContain('空')
    })
  })

  describe('fromFile', () => {
    it('Fileオブジェクトから非同期でBase64を作成できる', async () => {
      // モックFileオブジェクトを作成
      const file = new File(['test content'], 'test.png', { type: 'image/png' })
      
      // FileReaderのモック
      const mockFileReader = {
        readAsDataURL: vi.fn(),
        result: 'data:image/png;base64,dGVzdCBjb250ZW50',
        onload: null as any,
        onerror: null as any
      }

      vi.spyOn(global, 'FileReader').mockImplementation(() => mockFileReader as any)

      // fromFileを実行
      const promise = Base64.fromFile(file, defaultLanguage)
      
      // onloadを呼び出す
      if (mockFileReader.onload) {
        mockFileReader.onload({ target: mockFileReader } as any)
      }

      const result = await promise

      expect(result.isSuccess).toBe(true)
      expect(result.base64?.mimeType).toBe('image/png')
      
      vi.restoreAllMocks()
    })
  })

  describe('toFile', () => {
    it('Base64文字列をFileオブジェクトに変換できる', () => {
      // 実際のBase64文字列（小さなPNG画像）
      const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      const result = Base64.create(base64String, defaultLanguage)

      expect(result.isSuccess).toBe(true)
      
      const file = result.base64!.toFile('test.png')

      expect(file).toBeInstanceOf(File)
      expect(file.name).toBe('test.png')
      expect(file.type).toBe('image/png')
      expect(file.size).toBeGreaterThan(0)
    })
  })

  describe('default', () => {
    it('空のBase64インスタンスを返す', () => {
      const base64 = Base64.default()

      expect(base64.value).toBe('')
      expect(base64.mimeType).toBe('')
      expect(base64.isEmpty).toBe(true)
    })
  })

  describe('isImage', () => {
    it('画像のMIMEタイプの場合はtrueを返す', () => {
      const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'
      const result = Base64.create(base64String, defaultLanguage)

      expect(result.base64?.isImage).toBe(true)
    })

    it('画像以外のMIMEタイプの場合はfalseを返す', () => {
      const base64String = 'data:text/plain;base64,SGVsbG8gV29ybGQ='
      const result = Base64.create(base64String, defaultLanguage)

      expect(result.base64?.isImage).toBe(false)
    })
  })

  describe('dataOnly', () => {
    it('Base64データ部分のみを取得できる', () => {
      const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'
      const result = Base64.create(base64String, defaultLanguage)

      expect(result.base64?.dataOnly).toBe('iVBORw0KGgoAAAANSUhEUgAAAAUA')
    })
  })

  describe('isEmpty', () => {
    it('空のBase64の場合はtrueを返す', () => {
      const base64 = Base64.default()

      expect(base64.isEmpty).toBe(true)
    })

    it('データがある場合はfalseを返す', () => {
      const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'
      const result = Base64.create(base64String, defaultLanguage)

      expect(result.base64?.isEmpty).toBe(false)
    })
  })
})

